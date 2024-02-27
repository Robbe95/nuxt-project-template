/* eslint-disable check-file/filename-naming-convention */
import { createHttpZodClient } from '@appwise/zod-http-client'

import { defineNuxtPlugin, useNuxtApp } from '#app'
import { useToast } from '~/composables/toast/toast.composable'

export default defineNuxtPlugin({
	name: 'http',
	dependsOn: ['auth'],
	setup() {
		const axios = useNuxtApp().$axios
		const unauthorizedAxios = useNuxtApp().$unauthorizedAxios
		interface ZodError {
			url: string
			method: string
			error: unknown
		}

		const ENVIRONMENT = import.meta.env.ENVIRONMENT

		function onZodError({ url, method, error }: ZodError): void {
			const { showToast } = useToast()

			if (ENVIRONMENT !== 'production') {
				showToast({
					title: `${method.toUpperCase()} ${url} returned a malformed response.`,
				})
			}

			// eslint-disable-next-line no-console
			console.error(`${method.toUpperCase()} ${url} returned a malformed response\n\n`, error)
		}

		const httpClient = createHttpZodClient({
			axios,
			onZodError,
		})

		const unauthorizedHttpClient = createHttpZodClient({
			axios: unauthorizedAxios,
			onZodError,
		})
		return {
			provide: {
				httpClient,
				unauthorizedHttpClient,
			},
		}
	},
})
