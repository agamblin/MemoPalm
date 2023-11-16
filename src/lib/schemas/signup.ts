import * as z from 'zod'

const signupFormSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    })

export type SignupForm = z.infer<typeof signupFormSchema>

export default signupFormSchema
