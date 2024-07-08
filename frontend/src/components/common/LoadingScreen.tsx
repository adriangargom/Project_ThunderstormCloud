import { FC } from "react";
import AuthenticationTopBanner from "../authentication/common/authenticationTopBanner";


const LoadingScreen: FC = () => {

    return (
        <article className="select-none">

            <AuthenticationTopBanner />

            <section className="w-screen h-screen flex items-center justify-center">

                {/* Loading Animation element */}
                <span className="absolute w-20 h-20 bg-purple-500 rounded-full sm:animate-ping" />

            </section>

        </article>
    );

}

export default LoadingScreen;