<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({
	middleware: 'guest-middleware',
	layout: 'auth-layout',
})
</script>

<template>
	<NuxtPage />
</template>
