<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
	redirect: '/users',
})
</script>

<template>
	<div>
		<slot />
	</div>
</template>
