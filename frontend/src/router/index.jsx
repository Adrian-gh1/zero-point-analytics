// frontend/src/router/index.jsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LoginFormPage from "../components/LoginFormPage/LoginFormPage";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LoginFormPage />,
            },
            {
                path: '/login',
                element: <LoginFormPage />,
            },
            // {
            //     path: 'signup',
            //     element: <SignupFormPage />,
            // }
        ],
    },
]);