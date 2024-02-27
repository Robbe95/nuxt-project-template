import { defineI18nConfig } from '#i18n'

import en from './en.json'

export default defineI18nConfig(() => {
	return {
		legacy: false,
		locale: 'en',
		messages: {
			en,
		},
	}
})
