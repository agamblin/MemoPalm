'use server'

import User from '@/models/User'
import { hash } from 'bcryptjs'
import signupFormSchema, { SignupForm } from '../schemas/signup'
import { connectToDatabase } from '../connectToDatabase'

async function signup(formData: SignupForm) {
    const data = signupFormSchema.parse(formData)

    await connectToDatabase()
    const existingUser = await User.findOne({ email: data.email })
    if (existingUser) {
        throw new Error('Email already in use')
    }

    const hashedPassword = await hash(data.password, 12)

    const createdUser = await User.create({
        email: data.email,
        password: hashedPassword,
    })
    return {
        id: createdUser.id,
        email: createdUser.email,
    }
}

export default signup
