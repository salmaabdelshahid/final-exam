import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt';

export async function getToken() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("next-auth.session-token")?.value;

        if (!sessionToken) return null;

        const decoded = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        return decoded?.token || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}