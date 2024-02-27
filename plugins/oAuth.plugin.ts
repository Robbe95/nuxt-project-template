// eslint-disable-next-line check-file/filename-naming-convention
import { type CreateAxiosDefaults } from 'axios'
import Axios from 'axios'
import { defineNuxtPlugin, navigateTo } from 'nuxt/app'

import { useAuthStore } from '#imports'
import { addAuthorizationHeader, OAuth2VueClient } from '~/auth/vueAuth'

export default defineNuxtPlugin({
	name: 'auth',
	setup(nuxtApp) {
		const nuxtConfig = nuxtApp.$config

		const axiosConfig: CreateAxiosDefaults = {
			baseURL: `${nuxtConfig.public.apiBaseUrl}${nuxtConfig.public.apiEndpoint}`,
			headers: {
				'Accept-Language': 'en',
			},
		}

		const axios = Axios.create(axiosConfig)
		const unauthorizedAxios = Axios.create(axiosConfig)

		const oAuthClient = new OAuth2VueClient({
			axios: axios,
			clientId: nuxtConfig.public.apiClientId,
			clientSecret: nuxtConfig.public.apiClientSecret,
			tokenEndpoint: `${nuxtConfig.public.apiBaseUrl}/api/auth/token`,
			scopes: ['read', 'write'],
		})

		axios.interceptors.request.use((config) => addAuthorizationHeader(oAuthClient, config))

		axios.interceptors.response.use(
			(config) => config,
			async (error) => {
				if (!Axios.isAxiosError(error)) {
					return Promise.reject(error)
				}

				const status = error.response?.status ?? null

				if (status === 401) {
					const authStore = useAuthStore()
					authStore.logout()

					await navigateTo('login')
				}

				return Promise.reject(error)
			}
		)

		axios.interceptors.request.use((config) => addAuthorizationHeader(oAuthClient, config))

		axios.interceptors.response.use(
			(config) => config,
			async (error) => {
				if (!Axios.isAxiosError(error)) {
					return Promise.reject(error)
				}

				const status = error.response?.status ?? null

				if (status === 401) {
					const currentUserStore = useAuthStore()
					currentUserStore.logout()
				}

				return Promise.reject(error)
			}
		)

		return {
			provide: {
				oAuthClient,
				axios,
				unauthorizedAxios,
			},
		}
	},
})
