// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './LoginFormPage.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    // const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse && serverResponse.errors) {
            setError(serverResponse.errors);
          } else {
            navigate("/");
          }
        // navigate("/");
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                
                {error && <div className="error">{error}</div>}

                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginFormPage;