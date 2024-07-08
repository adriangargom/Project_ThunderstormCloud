import React, { FC, useState } from "react";
import ConfirmButton from "../../common/confirmButton";
import TextInputField from "../../common/textInputField";
import PasswordInputField from "../../common/passwordInputField";
import AuthenticationHelper from "../common/authenticationHelper";
import AuthenticationRequests from "../../../axios/authentication/authenticationRequests";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SignInPayloadIface } from "../../../types/authenticationTypes";


const SignInForm: FC = () => {
    
    const navigate = useNavigate();

    const [signInFormData, setSignInFormData] = useState<SignInPayloadIface>({
        username: '',
        password: ''
    });

    // Handles the input of the text input fields
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;

        setSignInFormData({
            ...signInFormData,
            [name]: value
        });
    }

    // Handles the action to submit the form and sends the sign in request
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();

        AuthenticationRequests.signInRequest(signInFormData)
            .then((data) =>  {
                if(!data.status) {
                    toast.error(data.message);
                    return;
                }

                Cookies.set('token', data.message, { expires: 1 })
                navigate('/home');
            });
        
    }

    return (
        <article onSubmit={handleSubmit} className="grid">

            <h1 className="w-full text-2xl font-bold text-purple-400 mb-8">
                Sign In
            </h1>

            <form className="grid gap-2">

                <TextInputField 
                    value={signInFormData.username}
                    name="username"
                    placeholder="Username"
                    onChange={handleInput} />

                <PasswordInputField 
                    value={signInFormData.password}
                    name="password" 
                    onChange={handleInput} />
                    
                <br/>
                <ConfirmButton 
                    title="Send"
                    buttonType="submit" />
                
            </form>
            
            <AuthenticationHelper 
                title="New User?" 
                linkTitle="Sign Up" 
                link="/auth/sign-up" />
                
        </article>
    );

}

export default SignInForm;