// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './LoginFormPage.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    
    // Dynamic States
    useEffect(() => {
        if (sessionUser && sessionUser.id) {
            navigate("/");
        }            
    }, [sessionUser, navigate]);

    // Static States
    const demoLoginHandler = async (e) => {
        e.preventDefault();
        const result = await dispatch(thunkLogin({
            email: "demo@aa.io", 
            password: "password"
        }));

        if (result.error) {
            setError("Invalid email or password. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(thunkLogin({email, password}));
        
        if (result.error) {
            setError("Invalid email or password. Please try again.");
        }
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

            <div className="demo-login">
                <button onClick={demoLoginHandler}>Demo Login</button>
            </div>

            <div>
                Have an Account? Login
            </div>

        </div>
    )
}

export default LoginFormPage;