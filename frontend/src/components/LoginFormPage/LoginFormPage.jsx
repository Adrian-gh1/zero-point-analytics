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
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                
                {error && <div className="login-error">{error}</div>}

                <div className="login-input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="login-input"
                    />
                </div>
                
                <div className="login-input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="login-input"
                    />
                </div>

                <button type="submit" className="login-submit-button">Login</button>
            </form>

            <div className="demo-login-container">
                <button onClick={demoLoginHandler} className="demo-login-button">Demo Login</button>
            </div>

            {/* <div className="login-footer">
                Have an Account? Login
            </div> */}
        </div>
    )
}

export default LoginFormPage;