'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import signup from '@/lib/actions/signup'
import signupFormSchema, { SignupForm } from '@/lib/schemas/signup'

function SignupPage() {
    const [error, setError] = React.useState<string | null>(null)
    const form = useForm<SignupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
    })

    async function onSubmit(data: SignupForm) {
        try {
            await signup(data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                <Button type="submit">Signup</Button>
                {error && (
                    <FormMessage className="text-sm text-center">
                        {error}
                    </FormMessage>
                )}
            </form>
        </Form>
    )
}

export default SignupPage
