<script setup lang="ts">
import { useI18n } from '#i18n'
import AppPage from '~/components/app/AppPage.vue'
import AppButton from '~/components/app/button/AppButton.vue'
import type { User } from '~/models/users/detail/user.model'
import type { Breadcrumb } from '~/types/breadcrumb.type'

const props = defineProps<{
	user: User
}>()

const { t } = useI18n()

const breadcrumbs: Breadcrumb[] = [
	{
		label: t('shared.users'),
		to: '/users',
	},
	{
		label: props.user.fullName,
	},
]
</script>

<template>
	<AppPage
		:breadcrumbs="breadcrumbs"
		:title="props.user.fullName"
	>
		<template #header-actions>
			<AppButton :to="`/users/${props.user.uuid}/update`">
				{{ t('users.detail.edit_user') }}
			</AppButton>
		</template>
	</AppPage>
</template>
