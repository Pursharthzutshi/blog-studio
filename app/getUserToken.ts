"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

// Define the shape of the decoded token
interface DecodedToken {
    id: string;
    emailId: string;
}

export default async function GetUserToken(): Promise<DecodedToken | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    try {
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            return user;
        }
        return null;
    } catch (error) {
        // Token is invalid or expired — return null, not the error
        return null;
    }
}