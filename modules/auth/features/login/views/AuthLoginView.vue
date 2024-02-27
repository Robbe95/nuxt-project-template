<script setup lang="ts">
import { useForm } from 'formango'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { navigateTo } from '#app'
import { useNuxtApp } from '#app'
import { useHandleApiError } from '~/composables/handle-api-error/handleApiError.composable'
import type { CurrentUser } from '~/models/auth/current-user/currentUser.model'
import { loginFormSchema } from '~/models/auth/login/loginForm.model'
import AuthPage from '~/modules/auth/components/AuthPage.vue'
import AuthLoginForm from '~/modules/auth/features/login/components/AuthLoginForm.vue'
import { useAuthStore } from '~/stores/auth.store'

const authStore = useAuthStore()

const { lastLoggedInUser } = storeToRefs(authStore)

const { t } = useNuxtApp().$i18n

const { form, onSubmitForm } = useForm({
	schema: loginFormSchema,
})

const title = computed<string>(() => {
	if (lastLoggedInUser.value === null) {
		return t('auth.login.log_in')
	}

	return t('auth.login.welcome_back_name', {
		name: lastLoggedInUser.value.firstName,
	})
})

async function handleLoggedIn(user: CurrentUser): Promise<void> {
	authStore.setLastLoginAttemptEmail(null)
	authStore.setLastLoggedInUser(user)

	await navigateTo('/')
}

onSubmitForm(async (data) => {
	try {
		await authStore.login(data)
		const currentUser = await authStore.getCurrentUser()

		await handleLoggedIn(currentUser)
	} catch (error) {
		useHandleApiError(error, form)
		authStore.setLastLoginAttemptEmail(data.email)
	}
})
</script>

<template>
	<AuthPage
		:description="t('auth.login.sign_in_to_continue')"
		:title="title"
	>
		<AuthLoginForm
			:form="form"
			:last-logged-in-user="lastLoggedInUser"
		/>
	</AuthPage>
</template>
