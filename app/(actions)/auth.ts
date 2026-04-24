"use server"

import { CreateNewUserAccountMethod, CheckIfEmailExists, CheckLoginUser } from "../lib/dal/user"

export async function CreateNewUserAccount(prevState: any, formData: FormData) {
    try {
        const emailId = formData.get("email-id") as string

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

        return {
            state: "success",
            message: "User Account Created",
            data: JSON.parse(JSON.stringify(UserAccountCreatedResult))
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

        return {
            state: "success",
            message: "Logged In Successfully",
            data: JSON.parse(JSON.stringify(checkLogin))
        }

    } catch (error) {
        return {
            state: "error",
            message: "User Login Failed",
            data: null,
        }
    }
}