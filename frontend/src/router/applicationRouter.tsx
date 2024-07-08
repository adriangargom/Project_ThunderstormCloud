import { FC } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInScreen from "../components/authentication/signIn/signInScreen";
import SignUpScreen from "../components/authentication/signUp/signUpScreen";
import HomeScreen from "../components/home/homeScreen";
import ErrorScreen from "../components/error/errorScreen";
import ProtectedRoute from "./protectedRoute";

const router = createBrowserRouter([
    {
        index: true,
        element: <Navigate to='/auth/sign-in' replace />
    },
    {
        path: '/auth',
        children: [
            {
                index: true,
                element: <Navigate to='/auth/sign-in' replace />
            },
            {
                path: 'sign-in',
                element: (
                    <SignInScreen />
                )
            },
            {
                path: 'sign-up',
                element: (
                    <SignUpScreen />
                )
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/home',
                element: (
                    <HomeScreen />
                )
            }
        ]
    },
    {
        path: '*',
        element: (
            <ErrorScreen />
        )
    }
]);


const ApplicationRouter: FC = () => {

    return (
        <RouterProvider router={router} />
    );

}

export default ApplicationRouter;