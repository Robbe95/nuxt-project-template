<script setup lang="ts">
import type { Field } from 'formango'

import { useI18n } from '#i18n'
import FormGrid from '~/components/app/grid/FormGrid.vue'
import FormSection from '~/components/form/form/FormSection.vue'
import FormInput from '~/components/form/input/FormInput.vue'

const props = defineProps<{
	firstName: Field<string>
	lastName: Field<string>
}>()

const { t } = useI18n()
</script>

<template>
	<FormSection
		:description="t('users.form.section.name.description')"
		:title="t('shared.name')"
	>
		<FormGrid :cols="2">
			<FormInput
				v-bind="props.firstName"
				:label="t('shared.first_name')"
			/>

			<FormInput
				v-bind="props.lastName"
				:label="t('shared.last_name')"
			/>
		</FormGrid>
	</FormSection>
</template>
