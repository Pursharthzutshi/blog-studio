import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { usersAccountSchemaTable, connectDB } from "../../models/db";

export async function CheckIfEmailExists(emailId: string) {
    await connectDB()
    const user = await usersAccountSchemaTable.findOne({ emailId: emailId })
    return user !== null
}

export async function CreateNewUserAccountMethod(formData: FormData) {
    await connectDB()

    const name = formData.get("name")
    const age = formData.get("age")
    const emailId = formData.get("email-id")
    const password = formData.get("password")

    const result = await usersAccountSchemaTable.create({ name, age, emailId, password })

    return result
}


export async function CheckLoginUser(emailId: string, password: string) {
    await connectDB()
    const result = await usersAccountSchemaTable.findOne({ emailId: emailId, password: password })

    console.log(result)

    return result
}

export async function GetUserToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    let emailId = ""
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
            emailId = decoded.emailId

            return emailId;
        } catch (error) {
            return error
        }
    }
}
