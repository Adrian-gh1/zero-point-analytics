// frontend/src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import LoginFormPage from "../components/LoginFormPage/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage/SignupFormPage";
import ServiceFormPage from "../components/ServiceFormPage/ServiceFormPage";
import BusinessFormPage from "../components/BusinessFormPage/BusinessFormPage";
import ServicesDirectoryPage from "../components/ServicesDirectoryPage/ServicesDirectoryPage";
import BusinessDirectoryPage from "../components/BusinessDirectoryPage/BusinessDirectoryPage";
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
                path: '/businessForm',
                element: <BusinessFormPage />
            },
            {
                path: '/serviceForm',
                element: <ServiceFormPage />
            },
            {
                path: '/serviceDirectory',
                element: <ServicesDirectoryPage />
            },
            {
                path: '/businessDirectory',
                element: <BusinessDirectoryPage />
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