// frontend/src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import LoginFormPage from "../components/LoginFormPage/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage/SignupFormPage";
import BusinessDetailsPage from "../components/BusinessDetailsPage";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/login',
                element: <LoginFormPage />
            },
            {
                path: '/signup',
                element: <SignupFormPage />
            },
            {
                path: '/business/:businessId',
                element: <BusinessDetailsPage />
            },
            // {
            //     path: '/businessPortfolio',
            //     element: <SignupFormPage />
            // },
            // {
            //     path: '/userProfile',
            //     element: <SignupFormPage />
            // },
            // {
            //     path: '/businessProfile',
            //     element: <SignupFormPage />
            // }
        ],
    },
]);