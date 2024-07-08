import jwt from "jsonwebtoken";
import 'dotenv/config'

class JwtUtils {

    private static secretApiKey = process.env.SECRET_API_KEY!;
    private static tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME!;

    static signToken(claims: any): string {
        return jwt.sign(
            claims,
            this.secretApiKey,
            { expiresIn: this.tokenExpirationTime }
        )
    }

}

export default JwtUtils;