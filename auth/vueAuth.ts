/* eslint-disable no-console */
import type { Axios, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { useCookie } from 'nuxt/app'

import type { OAuth2ClientTokensWithExpiration } from '~/auth/auth'
import { OAuth2Client, TokenStore } from '~/auth/auth'

interface OAuth2VueClientOptions {
	axios: Axios | AxiosInstance
	clientId: string
	clientSecret: string
	tokenEndpoint: string
	scopes?: string[]
}

export class OAuth2VueClient {
	private oAuthFactory: OAuth2Client
	private client: TokenStore | null = null

	constructor(private readonly options: OAuth2VueClientOptions) {
		const { axios, clientId, clientSecret, tokenEndpoint, scopes } = options

		this.oAuthFactory = new OAuth2Client({
			axios,
			clientId,
			clientSecret,
			tokenEndpoint,
			scopes,
		})

		const tokens = this.loadTokensFromLocalStorage()

		if (tokens !== null) {
			this.client = this.createClient(tokens)
		}
	}

	private createClient(tokens: OAuth2ClientTokensWithExpiration): TokenStore {
		const { axios, clientId, clientSecret, tokenEndpoint } = this.options

		const client = new TokenStore(
			{
				axios,
				clientId,
				clientSecret,
				tokenEndpoint,
			},
			tokens
		)

		client.onRefreshToken((tokens) => {
			this.saveTokensToLocalStorage(tokens)
		})

		return client
	}

	private saveTokensToLocalStorage(tokens: OAuth2ClientTokensWithExpiration | null): void {
		const cookieTokens = useCookie<OAuth2ClientTokensWithExpiration | null>('tokens', {
			default: () => null,
		})

		if (tokens === null) {
			cookieTokens.value = null
		} else {
			cookieTokens.value = tokens
		}
	}

	private loadTokensFromLocalStorage(): OAuth2ClientTokensWithExpiration | null {
		const tokens = useCookie<OAuth2ClientTokensWithExpiration | null>('tokens', {
			default: () => null,
		}).value

		if (tokens === null) {
			return null
		}

		const parsedTokens = tokens

		return parsedTokens
	}

	public getClient(): TokenStore | null {
		return this.client
	}

	private removeClient(): void {
		this.client = null
	}

	public async login(username: string, password: string): Promise<void> {
		const client = await this.oAuthFactory.login(username, password)

		const tokens = client.getTokens()

		this.saveTokensToLocalStorage(tokens)
		this.client = this.createClient(tokens)
	}

	public logout(): void {
		this.saveTokensToLocalStorage(null)
		this.removeClient()
	}

	public isLoggedIn(): boolean {
		const client = this.getClient()
		return client?.getTokens() != null
	}
}

export async function addAuthorizationHeader(
	oAuthClient: OAuth2VueClient,
	config: InternalAxiosRequestConfig<unknown>
): Promise<InternalAxiosRequestConfig<unknown>> {
	const client = oAuthClient.getClient()

	if (client === null) {
		return config
	}

	try {
		const token = await client.getAccessToken()
		config.headers.Authorization = `Bearer ${token}`
	} catch {
		console.warn('Failed to get access token, logging out')
	}

	return config
}
