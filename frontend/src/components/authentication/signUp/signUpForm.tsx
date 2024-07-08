import React, { FC, useState } from "react";
import TextInputField from "../../common/textInputField";
import PasswordInputField from "../../common/passwordInputField";
import AuthenticationHelper from "../common/authenticationHelper";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ConfirmButton from "../../common/confirmButton";
import { useNavigate } from "react-router-dom";
import { SignUpPayloadIface } from "../../../types/authenticationTypes";
import AuthenticationRequests from "../../../axios/authentication/authenticationRequests";


const SignUpForm: FC = () => {
    
    const navigate = useNavigate();

    const [signUpFormData, setSignUpFormData] = useState<SignUpPayloadIface>({
        username: '',
        password: '',
        repeatPassword: ''
    });

    // Handles the input of the text input fields
    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;

        setSignUpFormData({
            ...signUpFormData,
            [name]: value
        });
    }

    // Handles the action to submit the form and sends the sign up request
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        AuthenticationRequests.signUpRequest(signUpFormData)
            .then((data) => {
                if(!data.status) {
                    toast.error(data.message);
                    return;
                }

                Cookies.set('token', data.message, { expires: 1 });
                navigate('/home');
            });
    }

    return (
        <article onSubmit={handleSubmit} className="grid">

            <h1 className="w-full text-2xl font-bold text-purple-400 mb-8">
                Sign Up
            </h1>

            <form className="grid gap-2">

                <TextInputField 
                    value={signUpFormData.username}
                    name="username"
                    placeholder="Username"
                    onChange={handleTextFieldChange} />

                <PasswordInputField 
                    value={signUpFormData.password}
                    name="password" 
                    onChange={handleTextFieldChange} />

                <PasswordInputField 
                    value={signUpFormData.repeatPassword}
                    name="repeatPassword" 
                    placeholder="Repeat Password" 
                    onChange={handleTextFieldChange} />
                    
                <br/>
                <ConfirmButton 
                    title="Send"
                    buttonType="submit" />

            </form>
            
            <AuthenticationHelper 
                title="Existing User?" 
                linkTitle="Sign In" 
                link="/auth/sign-in" />

        </article>
    );

}

export default SignUpForm;