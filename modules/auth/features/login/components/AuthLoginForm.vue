<script setup lang="ts">
import type { Form } from 'formango'

import { NuxtLink } from '#components'
import { useI18n } from '#i18n'
import AppVerticalFormElementSpacer from '~/components/app/AppVerticalFormElementSpacer.vue'
import AppText from '~/components/app/text/AppText.vue'
import AppForm from '~/components/form/form/AppForm.vue'
import FormInput from '~/components/form/input/FormInput.vue'
import FormPasswordInput from '~/components/form/input/FormPasswordInput.vue'
import type { CurrentUser } from '~/models/auth/current-user/currentUser.model'
import type { loginFormSchema } from '~/models/auth/login/loginForm.model'
import AuthFormSubmitButton from '~/modules/auth/components/AuthFormSubmitButton.vue'

const props = defineProps<{
	form: Form<typeof loginFormSchema>
	lastLoggedInUser: CurrentUser | null
}>()

const { t } = useI18n()

// const email = props.form.register('email', props.lastLoggedInUser?.email)
const email = props.form.register('email', 'siemen.vandenneste+admin@wisemen.digital')
const password = props.form.register('password')
</script>

<template>
	<AppForm :form="form">
		<AppVerticalFormElementSpacer>
			<FormInput
				v-bind="email"
				:is-required="true"
				:label="t('form.fields.email')"
				placeholder="email@example.com"
				type="email"
			/>

			<FormPasswordInput
				v-bind="password"
				:is-required="true"
				:label="t('form.fields.password')"
				:placeholder="t('form.fields.password')"
			/>

			<NuxtLink
				class="py-2"
				to="/auth/forgot-password"
			>
				<AppText
					class="font-medium text-primary"
					variant="subtext"
				>
					{{ t('auth.login.forgot_password') }}
				</AppText>
			</NuxtLink>
		</AppVerticalFormElementSpacer>

		<AuthFormSubmitButton :form="form">
			{{ t('auth.login.log_in') }}
		</AuthFormSubmitButton>
	</AppForm>
</template>
