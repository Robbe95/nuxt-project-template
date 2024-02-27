import type { ComputedRef } from 'vue'
import { computed, onMounted, onUnmounted, type Ref, ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

import { useModal } from '~/composables/modal/modal.composable'
import { getGlobalI18n } from '~/utils/globalI18n.util'
import { deepClone } from '~/utils/object.util'
const { t } = getGlobalI18n()

interface UnsavedChanges<T> {
	setSnapshot: (object: T | null) => void
	isChanged: Ref<boolean>
	handleUnsavedClose: (callback: () => void) => void
}

export function useUnsavedChanges<T>(currentObject: ComputedRef<T>): UnsavedChanges<T> {
	const objectSnapshot = ref<T>()
	const router = useRouter()

	const confirmModal = useModal({
		component: () => import('~/components/app/AppConfirmModal.vue'),
	})

	const isChanged = computed<boolean>(() => {
		if (!objectSnapshot.value) {
			return false
		}

		const currentObjectString = JSON.stringify(currentObject.value)?.replace(/""/g, 'null')
		const snapshotString = JSON.stringify(objectSnapshot.value)?.replace(/""/g, 'null')
		return currentObjectString !== snapshotString
	})

	function setSnapshot(object: T | null): void {
		if (!object) {
			return
		}

		objectSnapshot.value = deepClone(object)
	}

	function handleUnsavedClose(callback: () => void): void {
		if (isChanged.value) {
			confirmModal.openModal({
				description: t('shared.unsaved_changes_description'),
				onConfirm: () => {
					confirmModal.closeModal()
					objectSnapshot.value = undefined
					callback()
				},
				title: t('shared.unsaved_changes_title'),
			})
			return
		}

		callback()
	}

	function handleRouteLeave(to: RouteLocationNormalized): void {
		handleUnsavedClose(async () => {
			objectSnapshot.value = undefined
			await router.push({
				name: to.name ?? undefined,
				params: to.params,
				query: to.query,
			})
		})
	}

	onBeforeRouteLeave((to, _, next) => {
		if (isChanged.value) {
			handleRouteLeave(to)
			return
		}

		next()
	})

	onUnmounted(() => {
		window.onbeforeunload = null
	})

	onMounted(() => {
		window.onbeforeunload = (e): string | null => {
			if (isChanged.value) {
				e = e || window.event

				if (e) {
					e.returnValue = t('shared.unsaved_changes_description')
				}

				return t('shared.unsaved_changes_description')
			}

			return null
		}
	})

	return {
		handleUnsavedClose,
		isChanged,
		setSnapshot,
	}
}
