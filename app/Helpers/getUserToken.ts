import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt';

export async function getToken(){
    // شرط الأمان لمنع إيرور الـ Request Scope
    try {
        const getToken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value
        
        if (!getToken) return null; // لو مفيش توكن اصلاً اخرج بسلام

        const accessToken = await decode({token:getToken, secret:process.env.NEXTAUTH_SECRET!})
        
        return accessToken?.token
    } catch (error) {
        // لو حصلت مشكلة في الـ scope هيرجع null بدل ما يوقع الموقع بشاشة سودة
        return null;
    }
}