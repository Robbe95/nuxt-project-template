<script setup lang="ts" generic="TFormType extends z.ZodType">
import type { Form } from 'formango'
import { computed } from 'vue'
import type { z } from 'zod'

import { useI18n } from '#i18n'
import AppIcon from '~/components/app/icon/AppIcon.vue'
import AppText from '~/components/app/text/AppText.vue'
import AppHeightTransition from '~/components/app/transitions/AppHeightTransition.vue'

const props = defineProps<{
	form: Form<TFormType>
}>()

const { t } = useI18n()

const isBannerVisible = computed<boolean>(() => {
	return props.form.hasAttemptedToSubmit && props.form.errors != null && props.form.errors._errors != null
})
</script>

<template>
	<AppHeightTransition :duration="200">
		<div v-if="isBannerVisible">
			<div
				class="mb-4 flex items-center rounded-input border border-solid border-destructive bg-destructive/5 px-4 py-3"
			>
				<AppIcon
					class="size-5 shrink-0 text-destructive"
					icon="warning"
				/>

				<AppText
					class="ml-4 max-w-sm text-destructive"
					variant="subtext"
				>
					{{ t('error.validation_error') }}
				</AppText>
			</div>
		</div>
	</AppHeightTransition>
</template>
