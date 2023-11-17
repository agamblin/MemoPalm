'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
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
import { LOGIN_ERROR_DESC, LOGIN_ERROR_TITLE } from '@/constants';
import { cn } from '@/lib/utils';

type SigninForm = {
    email: string;
    password: string;
};

function Signin() {
    const { toast } = useToast();
    const form = useForm<SigninForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function handleLogin(formData: SigninForm) {
        const res = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
        });

        if (res?.error) {
            toast({
                title: LOGIN_ERROR_TITLE,
                description: LOGIN_ERROR_DESC,
                variant: 'destructive',
            });
        } else {
            window.location.href = res?.url ?? '/';
            // If url contains a hash, the browser does not reload the page. We reload manually
            if (res?.url?.includes('#')) window.location.reload();
            return;
        }
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
