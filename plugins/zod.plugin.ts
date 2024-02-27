// eslint-disable-next-line check-file/filename-naming-convention
import { defineNuxtPlugin } from 'nuxt/app'
import type { ErrorMapCtx, ZodIssueOptionalMessage } from 'zod'
import { z } from 'zod'

import { getGlobalI18n } from '~/utils/globalI18n.util'

export default defineNuxtPlugin({
	name: 'zod',
	dependsOn: ['i18n:plugin'],
	setup() {
		const { t } = getGlobalI18n()

		function customErrorMap(issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx): { message: string } {
			const isStringAndEmpty = issue.code === 'too_small' && issue.minimum === 1 && issue.type === 'string'
			const isInvalidType = issue.code === 'invalid_type'
			const isInvalidDiscrimator = issue.code === 'invalid_union_discriminator'

			if (isStringAndEmpty || isInvalidType || isInvalidDiscrimator) {
				return {
					message: t('validation.required'),
				}
			}

			// TODO: Add more custom error messages here.

			return {
				message: ctx.defaultError,
			}
		}

		z.setErrorMap(customErrorMap)
	},
})
