import { z } from 'zod'

// GET /users/me
export const currentUserDtoSchema = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email().nullish(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
