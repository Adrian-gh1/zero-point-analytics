// frontend/src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import LoginFormPage from "../components/LoginFormPage/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage/SignupFormPage";
import ServiceFormPage from "../components/ServiceFormPage/ServiceFormPage";
import ServiceDetailsPage from "../components/ServiceDetailsPage";
import BusinessPortfolioPage from "../components/BusinessPortfolioPage/BusinessPortfolioPage";

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
                // path: '/business/:businessId',
                // element: <BusinessDetailsPage />

                path: '/service/:serviceId',
                element: <ServiceDetailsPage />

                // Possibly Change to:
                // path: '/connection/:connectionId',
                // element: <ConnectionDetailsPage />
            },
            {
                path: '/businessPortfolio',
                element: <BusinessPortfolioPage />
            },
            {
                path: '/serviceForm',
                element: <ServiceFormPage />
            },
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