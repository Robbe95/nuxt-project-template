import { isAxiosError } from 'axios'
import { defineNuxtRouteMiddleware } from 'nuxt/app'

import { useNuxtApp } from '#app'
import { navigateTo } from '#imports'
import { useAuthStore } from '~/stores/auth.store'
import { logError } from '~/utils/logger.util'

export default defineNuxtRouteMiddleware(async () => {
	const authStore = useAuthStore()
	const oAuthClient = useNuxtApp().$oAuthClient

	const hasTokens = oAuthClient.isLoggedIn()

	if (!hasTokens) {
		return navigateTo('/auth/login')
	}

	try {
		await authStore.getCurrentUser()
	} catch (error) {
		if (isAxiosError(error)) {
			authStore.logout()
		}

		logError(error)

		return navigateTo('/auth/login')
	}
})
