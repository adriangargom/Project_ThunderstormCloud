import { SignInPayloadIface, SignUpPayloadIface } from "../../types/authenticationTypes";
import ResponseIface from "../../types/responseTypes";
import Requests from "../requests";


export default class AuthenticationRequests {

    // Validates the actual JWT stored token 
    public static async validateToken(): Promise<ResponseIface> {
        return await Requests.getRequest<ResponseIface>(
            '/authentication/validate-token'
        );
    }

    // Sign Into a user account by providing the username and password
    public static async signInRequest(payload: SignInPayloadIface): Promise<ResponseIface> {
        return await Requests.postRequest<ResponseIface>(
            '/authentication/sign-in', 
            payload
        );
    }

    // Sing Up a new user account by username and validate the provided password
    public static async signUpRequest(payload: SignUpPayloadIface): Promise<ResponseIface> {
        if(payload.password !== payload.repeatPassword) {
            return { status: false, message: 'Passwords are not equal' };
        }

        return await Requests.postRequest<ResponseIface>(
            '/authentication/sign-up', 
            payload
        );
    }

}