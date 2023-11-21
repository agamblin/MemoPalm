'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/prisma';

import signupFormSchema from '../schemas/signup';

async function signup(_prevState: any, formData: FormData) {
    const parsedForm = Object.fromEntries(formData);
    const data = signupFormSchema.parse(parsedForm);

    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        return { message: 'User already exists' };
    }

    const hashedPassword = await hash(data.password, 12);

    await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
        },
    });
    redirect('/login');
}

export default signup;
