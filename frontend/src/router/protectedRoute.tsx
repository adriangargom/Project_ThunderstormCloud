import { FC, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthenticationRequests from "../axios/authentication/authenticationRequests";
import LoadingScreen from "../components/common/LoadingScreen";


const ProtectedRoute: FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const response = await AuthenticationRequests.validateToken();
            setIsAuthenticated(response.status);
        }
    
        setTimeout(checkAuthentication, 1000);
    }, []);

    if(isAuthenticated === null) {
        return <LoadingScreen />
    }

    return (!isAuthenticated)? <Navigate to='/' /> : <Outlet />

}

export default ProtectedRoute;