import PasswordUtils from "../utils/passwordUtils";

const testPasswords: string[] = [
    '123456',
    'passwordtest',
    'testPassword123456',
    "1029384756",
    "password-1234567890-test"
];


describe('Password utils testing', () => {

    it('Password hashing and unhashing', () => {

        testPasswords.forEach(async (password: string) => {
            const hashedPassword = await PasswordUtils.hashPassword(password);
            const passwordValidation = await PasswordUtils.validatePassword(password, hashedPassword);

            expect(passwordValidation).toEqual(true);
        });
        
    })

})

