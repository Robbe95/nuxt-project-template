<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { NuxtPage } from '#components'
import { definePageMeta } from '#imports'

definePageMeta({
	middleware: 'auth-middleware',
})
</script>

<template>
	<NuxtPage />
</template>
