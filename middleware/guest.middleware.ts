import { defineNuxtRouteMiddleware } from 'nuxt/app'

import { useNuxtApp } from '#app'

export default defineNuxtRouteMiddleware(async () => {
	const oAuthClient = useNuxtApp().$oAuthClient
	const isLoggedIn = oAuthClient.isLoggedIn()

	if (!isLoggedIn) {
		return
	}
})
