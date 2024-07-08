import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmButton from "../../common/confirmButton";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";


const HomeHeaderBar = () => {

    const navigate = useNavigate();

    const [menuStatus, setMenuStatus] = useState<boolean>(false);
    
    const handleLogOut = () => {
        if(Cookies.get('token')) {
            Cookies.remove('token');
        }

        navigate('/');
    }

    return (
        <header className="w-full p-4 flex bg-purple-500 items-center">

            <section className="w-full">

                <h1 className="text-xl text-purple-100">
                    Thunderstorm Cloud
                </h1>
            
            </section>


            <section className="w-10">
            
                <FontAwesomeIcon 
                    icon={faBars} 
                    onClick={ () => setMenuStatus(!menuStatus) }
                    className="text-xl text-purple-100 hover:text-purple-300 
                    cursor-pointer transition" />

                {
                    menuStatus && (
                        <div className="top-[3rem] right-[2rem] w-32 h-auto p-2 fixed 
                            flex flex-col rounded-md shadow-md bg-purple-100">
        
                            <ConfirmButton 
                                title="Log Out" 
                                icon={faSignOut} 
                                onClick={handleLogOut} />
    
                        </div>
                    )
                }

            </section>

        </header>
    );
    
}

export default HomeHeaderBar;