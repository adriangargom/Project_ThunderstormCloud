import { FC, useEffect, useState } from "react";
import AuthenticationRequests from "../../axios/authentication/authenticationRequests";
import { Link } from "react-router-dom";


const ErrorScreen: FC = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        AuthenticationRequests.validateToken()
            .then((data) => {
                setIsAuthenticated(data.status)
            });
    });

    return (
        <article className="w-screen h-screen flex flex-col gap-4 items-center justify-center select-none">

            <section className="w-10/12 p-5 grid grid-cols-2 gap-5">

                <span className="text-9xl font-bold text-end">
                    404.
                </span>

                <div className="grid gap-4">

                    <h1 className="text-6xl text-purple-500 font-bold">
                        Oops!
                    </h1>

                    <h1 className="text-4xl">
                        We couldn't find this page.
                    </h1>

                </div>

            </section>

            <div className="w-full flex items-center justify-center">

                <Link 
                    to={(!isAuthenticated)? "/auth/sign-in" : "/home"}
                    className="text-xl underline
                    border-purple-500 text-purple-500 text-center
                    hover:text-purple-400 hover:border-purple-400 transition">
                    
                    Return
                </Link>

            </div>

        </article>
    );

}

export default ErrorScreen;