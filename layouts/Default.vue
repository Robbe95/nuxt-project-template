<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { NuxtPage } from '#components'
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<!-- sidebar, header, ... -->
		<div class="flex flex-1 overflow-hidden">
			<NuxtPage />
		</div>
	</div>
</template>
