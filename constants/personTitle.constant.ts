import { computed } from 'vue'
import { z } from 'zod'

import { getGlobalI18n } from '#imports'
import type { DataItem } from '~/types/dataItem.type'

export const personTitleConstantSchema = z.enum(['mr', 'mrs', 'miss', 'ms', 'dr', 'prof', 'other'])

export type PersonTitleConstant = z.infer<typeof personTitleConstantSchema>

export const PERSON_TITLE_ITEMS = computed<DataItem<PersonTitleConstant>[]>(() => {
	const { t } = getGlobalI18n()

	return [
		{ value: 'mr', label: t('shared.mr') },
		{ value: 'mrs', label: t('shared.mrs') },
		{ value: 'miss', label: t('shared.miss') },
		{ value: 'ms', label: t('shared.ms') },
		{ value: 'dr', label: t('shared.dr') },
		{ value: 'prof', label: t('shared.prof') },
		{ value: 'other', label: t('shared.other') },
	]
})
