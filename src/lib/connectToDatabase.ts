import mongoose from 'mongoose'

declare global {
    namespace globalThis {
        var mongoose: {
            conn: mongoose.Connection | typeof import('mongoose') | null
            promise: Promise<
                mongoose.Connection | typeof import('mongoose')
            > | null
        }
    }
}

const MONGODB_URI = process.env.MONGODB_URI // Your MongoDB URI

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local'
        )
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose
            })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export { connectToDatabase }
