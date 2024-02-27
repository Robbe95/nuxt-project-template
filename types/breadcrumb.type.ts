import type { RouteLocationRaw } from 'vue-router'

export interface Breadcrumb {
	label: string
	to?: RouteLocationRaw
}
