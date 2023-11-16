'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import signup from '@/lib/actions/signup';
import signupFormSchema, { SignupForm } from '@/lib/schemas/signup';
import { useFormState } from 'react-dom';
import FormButton from '@/components/FormButton';

function SignupPage() {
    const [state, serverAction] = useFormState(signup, { message: '' });
    const form = useForm<SignupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    return (
        <Form {...form}>
            <form
                action={async (formData: FormData) => {
                    const valid = await form.trigger();
                    if (!valid) return;
                    return serverAction(formData);
                }}
                className="max-w-xl flex flex-col gap-4 mx-auto pt-24"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Email</FormLabel>
                            <FormControl {...field}>
                                <Input
                                    type="email"
                                    placeholder="john@doe.com"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>Password</FormLabel>
                            <FormControl {...field}>
                                <Input type="password" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor={field.name}>
                                Password Confirm
                            </FormLabel>
                            <FormControl {...field}>
                                <Input type="password" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />
                <FormButton type="submit">Signup</FormButton>
                {state?.message && (
                    <FormMessage className="text-sm text-center">
                        {state.message}
                    </FormMessage>
                )}
            </form>
        </Form>
    );
}

export default SignupPage;
