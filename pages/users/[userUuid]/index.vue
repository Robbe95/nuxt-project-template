<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from '#app'
import type { UserUuid } from '~/models/users/userUuid.model'
import { useGetUsersDetailQuery } from '~/modules/users/api/queries/usersDetail.query'
import UsersDetailView from '~/modules/users/features/detail/views/UsersDetailView.vue'
const route = useRoute('users-userUuid')
const userUuid = route.params.userUuid as UserUuid
const { data: user, suspense } = useGetUsersDetailQuery(userUuid)

await suspense()
</script>

<template>
	<UsersDetailView
		v-if="user !== null"
		:user="user"
	/>
</template>
