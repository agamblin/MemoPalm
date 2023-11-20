import * as z from 'zod';

const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

export default LoginFormSchema;
