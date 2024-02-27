import { z } from 'zod'

import { useNuxtApp } from '#app'
import {
	transformCurrentUserDtoToCurrentUser,
	transformForgotPasswordFormToForgotPasswordDto,
	transformResetPasswordFormToResetPasswordDto,
} from '~/models/auth/auth.transformer'
import type { CurrentUser } from '~/models/auth/current-user/currentUser.model'
import { currentUserDtoSchema } from '~/models/auth/current-user/currentUserDto.model'
import type { ForgotPasswordForm } from '~/models/auth/forgot-password/forgotPasswordForm.model'
import type { ResetPasswordForm } from '~/models/auth/reset-password/resetPasswordForm.model'

interface AuthService {
	forgotPassword: (body: ForgotPasswordForm) => Promise<void>
	resetPassword: (body: ResetPasswordForm) => Promise<void>
	getCurrentUser: () => Promise<CurrentUser>
}

export const authService: AuthService = {
	forgotPassword: async (form: ForgotPasswordForm): Promise<void> => {
		const unauthorizedHttpClient = useNuxtApp().$unauthorizedHttpClient
		await unauthorizedHttpClient.post({
			url: '/forgot-password',
			body: transformForgotPasswordFormToForgotPasswordDto(form),
			responseSchema: z.unknown(),
		})
	},
	resetPassword: async (form: ResetPasswordForm): Promise<void> => {
		const unauthorizedHttpClient = useNuxtApp().$unauthorizedHttpClient

		await unauthorizedHttpClient.post({
			url: '/reset-password',
			body: transformResetPasswordFormToResetPasswordDto(form),
			responseSchema: z.unknown(),
		})
	},
	getCurrentUser: async (): Promise<CurrentUser> => {
		const nuxtApp = useNuxtApp()
		const httpClient = nuxtApp.$httpClient
		const data = await httpClient.get({
			url: `${nuxtApp.$config.public.apiBaseUrl}/api/auth/userinfo`,
			responseSchema: currentUserDtoSchema,
			config: {
				baseURL: import.meta.env.API_BASE_URL,
			},
		})

		return transformCurrentUserDtoToCurrentUser(data)
	},
}
