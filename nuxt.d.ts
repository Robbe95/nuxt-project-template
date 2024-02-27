import type { createHttpZodClient } from '@appwise/zod-http-client'
import type { AxiosInstance } from 'axios'
import type dayjs from 'dayjs'

import type { OAuth2VueClient } from '~/config/auth.config'

declare module '#app' {
	interface NuxtApp {
		$httpClient: ReturnType<typeof createHttpZodClient>
		$unauthorizedHttpClient: ReturnType<typeof createHttpZodClient>
		$axios: AxiosInstance
		$unauthorizedAxios: AxiosInstance
		$oAuthClient: OAuth2VueClient
		$dayjs: typeof dayjs
	}
}
declare module 'vue' {
	interface ComponentCustomProperties {
		$httpClient: CreateHttpZodClientReturnType
		$unauthorizedHttpClient: CreateHttpZodClientReturnType
		$axios: AxiosInstance
		$unauthorizedAxios: AxiosInstance
		$oAuthClient: OAuth2VueClient
		$dayjs: typeof dayjs
	}
}
