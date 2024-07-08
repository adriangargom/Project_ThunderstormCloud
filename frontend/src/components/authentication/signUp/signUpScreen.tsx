import { FC } from "react";
import AuthenticationTopBanner from "../common/authenticationTopBanner";
import SignUpForm from "./signUpForm";


const SignUpScreen: FC = () => {
    
    return (
        <main className="select-none">

            <AuthenticationTopBanner/>

            <article className="w-screen h-screen flex items-center justify-center">

                <section className=" w-9/12 md:w-6/12 xl:w-4/12 p-5 shadow-sm border-2 rounded-md">
                    <SignUpForm/>
                </section>
                
            </article>

        </main>
    );

}

export default SignUpScreen;