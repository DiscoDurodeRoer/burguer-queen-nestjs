import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    secretKey: process.env.SECRETKEY_AUTH,
    expiresIn: process.env.AUTH_EXPIRES_IN || '1d'
}))