'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import FormButton from '@/components/FormButton';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { REGISTER_ERROR_TITLE } from '@/constants';
import signup from '@/lib/actions/signup';
import signupFormSchema, { SignupForm } from '@/lib/schemas/signup';

function SignupPage() {
    const { toast } = useToast();
    const [state, dispatch] = useFormState(signup, { message: '' });
    const form = useForm<SignupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    useEffect(() => {
        if (state.message) {
            toast({
                title: REGISTER_ERROR_TITLE,
                description: state.message,
                variant: 'destructive',
            });
        }
    }, [state.message, toast]);

    return (
        <Form {...form}>
            <form
                action={async (formData: FormData) => {
                    const valid = await form.trigger();
                    if (!valid) return;
                    return dispatch(formData);
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
            </form>
        </Form>
    );
}

export default SignupPage;
