import type { useI18n } from '#imports'
import { useNuxtApp } from '#imports'

export function getGlobalI18n(): ReturnType<typeof useI18n> {
	const nuxtApp = useNuxtApp()
	return nuxtApp.$i18n
}
