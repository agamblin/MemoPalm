import { connectToDatabase } from '@/lib/connectToDatabase'
import { verifyPassword } from '@/lib/verifyPassword'
import User from '@/models/User'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'john@doe.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            authorize: async (credentials) => {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    return null
                }

                await connectToDatabase()
                const user = await User.findOne({ email: credentials.email })

                if (!user) {
                    throw new Error('No user found')
                }
                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                )
                if (!isValid) {
                    throw new Error('Invalid password')
                }

                return { id: user.id, email: user.email }
            },
        }),
    ],
})
