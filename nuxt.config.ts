// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiEndpoint: '', // can be overridden by NUXT_PUBLIC_API_ENDPOINT environment variable
			apiBaseUrl: '', // can be overridden by NUXT_PUBLIC_API_URL environment variable
			apiClientSecret: '', // can be overridden by NUXT_PUBLIC_API_CLIENT_SECRET environment variable
			apiClientId: '', // can be overridden by NUXT_PUBLIC_API_CLIENT_ID environment variable
		},
	},
	vue: {
		propsDestructure: true,
	},
	devtools: {
		enabled: true,
		timeline: {
			enabled: true,
		},
	},
	components: {
		global: false,
	},
	imports: {
		autoImport: false,
	},
	experimental: {
		typedPages: true,
	},
	modulesDir: ['./tasks'],
	css: ['~/assets/styles/index.scss'],
	modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/test-utils/module'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	build: {
		transpile: ['vue-sonner'],
	},
	i18n: {
		vueI18n: './locales/i18n.ts',
	},
})
