'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

import User from '@/models/User';

import { connectToDatabase } from '../connectToDatabase';
import signupFormSchema from '../schemas/signup';

async function signup(_prevState: any, formData: FormData) {
    const parsedForm = Object.fromEntries(formData);
    const data = signupFormSchema.parse(parsedForm);

    await connectToDatabase();
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
        return { message: 'User already exists' };
    }

    const hashedPassword = await hash(data.password, 12);

    await User.create({
        email: data.email,
        password: hashedPassword,
    });
    redirect('/login');
}

export default signup;
