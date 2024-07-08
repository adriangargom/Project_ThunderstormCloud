import bcrypt, { hash } from 'bcrypt';

class PasswordUtils {

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
            .then((hash: string) => hash)
    }

    static async validatePassword(password: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHash)
            .then((status: boolean) => status)
    }

}

export default PasswordUtils;