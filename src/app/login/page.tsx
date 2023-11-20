'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
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
import { LOGIN_ERROR_DESC, LOGIN_ERROR_TITLE } from '@/constants';
import { authenticate } from '@/lib/actions/login';
import LoginFormSchema, { LoginForm } from '@/lib/schemas/login';

function Login() {
    const [state, dispatch] = useFormState(authenticate, undefined);

    const { toast } = useToast();

    const form = useForm<LoginForm>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    React.useEffect(() => {
        if (state === 'CredentialsSignin') {
            toast({
                title: LOGIN_ERROR_TITLE,
                description: LOGIN_ERROR_DESC,
                variant: 'destructive',
            });
        }
    }, [state, toast]);

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
                <FormButton type="submit">Login</FormButton>
            </form>
        </Form>
    );
}

export default Login;
