<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

import { NuxtLayout, NuxtLoadingIndicator, NuxtPage } from '#components'
import AppPageLoader from '~/components/app/loader/AppPageLoader.vue'
import AppModalsContainer from '~/components/app/modal/AppModalsContainer.vue'
import AppToastContainer from '~/components/app/toast/AppToastContainer.vue'
</script>

<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<VueQueryDevtools />
	<AppPageLoader />
	<AppModalsContainer />
	<AppToastContainer />
</template>
