import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env")
}

// Cache the connection promise globally so it survives Next.js hot reloads
let cached = (global as any).mongoose
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            console.error("MongoDB Connected Successfully")
            return mongoose
        })
    }

    cached.conn = await cached.promise
    return cached.conn
}

const blogSchema = new mongoose.Schema({
    uid: String,
    title: String,
    description: String
})


const usersAccount = new mongoose.Schema({
    uid: String,
    name: String,
    age: Number,
    emailId: String,
    password: String
})

const blogAnalysis = new mongoose.Schema({
    blogId: String,
    blogAnalysis: String
})

const blogScehmaTable = mongoose.models.blogSchema || mongoose.model("blogSchema", blogSchema, "blogScehma")

const usersAccountSchemaTable = mongoose.models.usersAccountSchema || mongoose.model("usersAccountSchema", usersAccount, "usersAccountSchema")

const blogAnalysisSchemaTable = mongoose.models.blogAnalysisSchema || mongoose.model("blogAnalysisSchema", blogAnalysis, "blogAnalysisSchema")

export { blogScehmaTable, usersAccountSchemaTable, blogAnalysisSchemaTable }