import UserModel from "../data/models/userModel";
import { collections } from "../data/services/databaseService";
import HttpError from "../errors/HttpError";
import PasswordUtils from "../utils/passwordUtils";
import * as fs from 'fs';
import 'dotenv/config'

class AuthenticationService {

    private static systemSlash = process.platform === 'win32'? '\\': '/';
    private static mainDirectoryPath = process.env.MAIN_DIRECTORY_PATH!!;

    static async signIn(username: string, password: string) {

        // Check if the user exists
        const dbUser = await collections.users?.findOne({ username: username });

        if(!dbUser) throw new HttpError(404, 'User not found');
        
        // Validate the provided user password
        const validationStatus = await PasswordUtils.validatePassword(password, dbUser!.password);
        if(!validationStatus) throw new Error('Invalid Credentials');
        
    }

    static async signUp(username: string, password: string) {
        
        // Check if the provided username is in use
        const isUsernameInUse = await collections.users?.findOne({ username: username }) != null;

        if(isUsernameInUse) throw new HttpError(409, 'User already exists');

        // Insert the new user into the database and hash the provided password
        await collections.users?.insertOne(
            new UserModel(
                username,
                await PasswordUtils.hashPassword(password)
            )
        );

        // Create the user directory when the new user signs up into the system
        const userDirectoryPath = `${this.mainDirectoryPath}-${username}`.replaceAll('-', this.systemSlash);
        fs.mkdirSync(userDirectoryPath, { recursive: true });
    }

}

export default AuthenticationService;