import { FC } from "react";
import AuthenticationTopBanner from "../common/authenticationTopBanner";
import SignInForm from "./signInForm";


const SignInScreen: FC = () => {

    return (
        <main className="select-none">
            
            <AuthenticationTopBanner/>

            <article className="w-screen h-screen flex items-center justify-center">

                <section className="w-9/12 md:w-6/12 xl:w-4/12 p-5 shadow-sm border-2 rounded-md">
                    <SignInForm/>
                </section>
                
            </article>
        </main>
    );

}

export default SignInScreen;