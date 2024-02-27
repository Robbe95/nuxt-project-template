import type { UseMutationReturnType } from '~/composables/mutation/mutation.composable'
import { useMutation } from '~/composables/mutation/mutation.composable'
import type { ResetPasswordForm } from '~/models/auth/reset-password/resetPasswordForm.model'

import { authService } from '../services/auth.service'

export function useAuthResetPasswordMutation(): UseMutationReturnType<ResetPasswordForm, void> {
	return useMutation<ResetPasswordForm, void>({
		queryFn: async ({ body }) => {
			await authService.resetPassword(body)
		},
		queryKeysToInvalidate: [],
	})
}
