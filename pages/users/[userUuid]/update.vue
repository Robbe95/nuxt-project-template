<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from '#imports'
import type { UserUuid } from '~/models/users/userUuid.model'
import { useGetUsersDetailQuery } from '~/modules/users/api/queries/usersDetail.query'
import UsersUpdateView from '~/modules/users/features/update/views/UsersUpdateView.vue'

const route = useRoute('users-userUuid-update')

const userUuid = route.params.userUuid as UserUuid

const { data: user, suspense } = useGetUsersDetailQuery(userUuid)

await suspense()
</script>

<template>
	<UsersUpdateView
		v-if="user !== null"
		:user="user"
	/>
</template>
