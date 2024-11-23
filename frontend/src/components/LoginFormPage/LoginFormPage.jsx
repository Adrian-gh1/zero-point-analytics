// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect } from "react";
// import { thunkLogin } from "../../redux/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import './LoginFormPage.css';

function LoginFormPage() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const sessionUser = useSelector(state => state.session.user);

    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const fetchCsrfToken = async () => {
            const response = await fetch("http://127.0.0.1:5000/csrf-token");
            const data = await response.json();
            setCsrfToken(data.csrf_token);
        };
        fetchCsrfToken();
    }, []);

    if (!csrfToken) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form method="POST" action="/login">
                <input type="hidden" name="csrf_token" value={csrfToken} />
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit">Login</button>
            </form>

        </div>
    )
}

export default LoginFormPage;