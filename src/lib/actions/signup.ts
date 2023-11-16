'use server';

import User from '@/models/User';
import { hash } from 'bcryptjs';
import signupFormSchema, { SignupForm } from '../schemas/signup';
import { connectToDatabase } from '../connectToDatabase';
import { revalidatePath } from 'next/cache';

function formDataToJson(formData: FormData) {
    const initial: Record<string, unknown> = {};
    return Array.from(formData.entries()).reduce((json, [key, value]) => {
        json[key] = value;
        return json;
    }, initial);
}

async function signup(prevState: any, formData: FormData) {
    const parsedForm = formDataToJson(formData);
    const data = signupFormSchema.parse(parsedForm);

    console.log('data:', data);

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
    return revalidatePath('/');
}

export default signup;
