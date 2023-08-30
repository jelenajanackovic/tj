import * as jwt from "jsonwebtoken";

type JWT = {
    iss: string,
    sub: number,
    role: string,
    typ: string,
    ip: string,
    ua: string,
    iat: number,
    exp: number
}

export function createJWT(iss: string, duration: number, typ: string, sub: number, role: string, ip: string, ua: string, secret: string) {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + duration;

    const data = {
        iss: iss,
        sub: sub,
        role: role,
        typ: typ,
        ip: ip,
        ua: ua,
        iat: now,
        exp: exp


    }
    const token = jwt.sign(data, secret);
    return token;

}

export function decodeJWT(token: string, secret: string) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded as unknown as JWT;

    } catch{
        return null;
    }

}