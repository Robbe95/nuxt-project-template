<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const { to } = defineProps<{
	to: RouteLocationRaw
}>()
</script>

<template>
	<NuxtLink
		v-slot="{ isActive, isExactActive }"
		class="rounded text-left ring-primary ring-offset-background duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
		:to="to"
	>
		<slot
			:is-active="isActive"
			:is-exact-active="isExactActive"
		/>
	</NuxtLink>
</template>
