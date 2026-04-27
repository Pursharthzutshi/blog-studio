"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

import { CreateNewUserAccountMethod, CheckIfEmailExists, CheckLoginUser } from "../lib/dal/user"

export async function CreateNewUserAccount(prevState: any, formData: FormData) {
    try {
        const emailId = formData.get("email-id") as string
        const id = formData.get("id")

        console.log(emailId)

        const ifEmailIdExist = await CheckIfEmailExists(emailId)

        if (ifEmailIdExist) {
            return {
                state: "error",
                message: "Email Id Already Exists",
                data: null,
            }
        }

        const UserAccountCreatedResult = await CreateNewUserAccountMethod(formData)
        const user = JSON.parse(JSON.stringify(UserAccountCreatedResult))

        const token = jwt.sign(
            { id: user._id, emailId: user.emailId },
            process.env.JWT_SECRET as string,
            { expiresIn: "15m" }
        )

        const cookieStore = await cookies()
        cookieStore.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60,
            path: "/"
        })

        return {
            state: "success",
            message: "User Account Created",
            data: user
        }

    } catch (error) {
        return {
            state: "error",
            message: "User Account Not Created",
            data: null,
        }
    }
}

export async function LoginUser(prevState: any, formdata: FormData) {
    try {

        const emailId = formdata.get("email-id") as string;
        const password = formdata.get("password") as string;

        const checkLogin = await CheckLoginUser(emailId, password)

        if (!checkLogin) {
            return {
                state: "error",
                message: "Invalid Credentials",
                data: null
            }
        }

        const user = JSON.parse(JSON.stringify(checkLogin))

        // Generate token for login too
        const token = jwt.sign(
            { id: user._id, emailId: user.emailId },
            process.env.JWT_SECRET as string,
            { expiresIn: "15m" }
        )

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60,
            path: "/"
        })

        return {
            state: "success",
            message: "Logged In Successfully",
            data: user
        }

    } catch (error) {
        return {
            state: "error",
            message: "User Login Failed",
            data: null,
        }
    }
}