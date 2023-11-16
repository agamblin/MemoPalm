import mongoose from 'mongoose'

declare namespace NodeJS {
    interface Global {
        mongoose: {
            conn: mongoose.Connection | null
            promise: Promise<mongoose.Connection> | null
        }
    }
}
