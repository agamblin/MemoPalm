'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/FormButton';
// import { signIn } from '@/auth';
import { signIn } from 'next-auth/react';

type SigninForm = {
    email: string;
    password: string;
};

function Signin() {
    const form = useForm<SigninForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function handleLogin(formData: SigninForm) {
        signIn('credentials', {
            email: formData.email,
            password: formData.password,
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleLogin)}
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
                <FormButton type="submit">Login</FormButton>
            </form>
        </Form>
    );
}

export default Signin;
