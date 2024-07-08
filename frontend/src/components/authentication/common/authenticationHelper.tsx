import { FC } from "react";
import { Link } from "react-router-dom";


export interface AuthenticationHelper {
    title: string
    linkTitle: string
    link: string
}


const AuthenticationHelper: FC<AuthenticationHelper> = ({title, linkTitle, link}) => {

    return (
        <article className="w-full mt-4 flex justify-center items-center">
            <section className="flex gap-1 ">

                <h1 className="text-gray-400"> {title} </h1>

                <Link 
                    to={link}
                    className="text-purple-400 hover:text-purple-200 
                    underline cursor-pointer">

                    { linkTitle }
                </Link>

            </section>
        </article>
    );

}

export default AuthenticationHelper;