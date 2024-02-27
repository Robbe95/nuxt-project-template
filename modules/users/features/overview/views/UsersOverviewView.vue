<script setup lang="ts">
import { useRouter } from '#app'
import { useI18n } from '#i18n'
import AppTablePage from '~/components/app/AppTablePage.vue'
import { useTablePagination } from '~/composables/table-pagination/tablePagination.composable'
import type { UserIndexFilters } from '~/models/users/index/userIndexFilters.model'
import type { UserUuid } from '~/models/users/userUuid.model'
import { useUsersIndexQuery } from '~/modules/users/api/queries/usersIndex.query'

import UsersOverviewHeaderActions from '../components/UsersOverviewHeaderActions.vue'
import UsersOverviewTable from '../components/UsersOverviewTable.vue'

const { t } = useI18n()
const router = useRouter()

const paginationOptions = useTablePagination<UserIndexFilters>({
	id: 'users',
})

const {
	data: paginatedUsers,
	isLoading: isLoadingUsers,
	suspense,
} = useUsersIndexQuery(paginationOptions.paginationOptions)

function onNavigateToUserDetail(userUuid: UserUuid): void {
	router.push(`/users/${userUuid}`)
}

function onSearch(search: string | null): void {
	paginationOptions.handleFilterChange({
		// eslint-disable-next-line camelcase
		beer_name: search,
	})
}

await suspense()
</script>

<template>
	<AppTablePage :title="t('shared.users')">
		<template #header-actions>
			<UsersOverviewHeaderActions
				:pagination="paginationOptions"
				@search="onSearch"
			/>
		</template>

		<template #default>
			<UsersOverviewTable
				:data="paginatedUsers"
				:is-loading="isLoadingUsers"
				:pagination="paginationOptions"
				@navigate-to-user-detail="onNavigateToUserDetail"
			/>
		</template>
	</AppTablePage>
</template>
