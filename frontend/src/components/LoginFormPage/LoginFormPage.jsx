// frontend/src/components/LoginFormPage/LoginFormPage.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import './LoginFormPage.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: '', password: ''});
    
    // Dynamic States
    useEffect(() => {
        if (sessionUser && sessionUser.id) {
            navigate("/");
        }            
    }, [sessionUser, navigate]);

    // Static States
    const demoLoginHandler = async (e) => {
        e.preventDefault();
        const response = await dispatch(thunkLogin({
            email: "demo@aa.io", 
            password: "password"
        }));

        if (response.error) {
            setErrors("Invalid email or password. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(thunkLogin({email, password}));

        if (response.email || response.password) {
            setErrors({
                email: response.email ? response.email[0] : null,
                password: response.password ? response.password[0] : null
            });
        }        
    };

    return (
        <div className="login-form-container">
            {/* NOTE: If  onSubmit fails to submit defaults to onClick*/}
            <form 
                className="login-form" 
                onSubmit={handleSubmit} 
                onClick={(e) => {
                    if (e.target !== e.currentTarget) {
                        handleSubmit(e);
                    }
                }}
            >
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
                    {errors?.email && <div className="login-error">{errors.email}</div>}
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
                    {errors?.password && <div className="login-error">{errors.password}</div>}
                </div>

                <button type="submit" className="login-submit-button">Login</button>

            </form>

            <div className="demo-login-container">
                <button onClick={demoLoginHandler} className="demo-login-button">Demo Login</button>
            </div>

            <div className="login-footer">
                Don't have an Account? 
                <Link to="/signup" className="signup-link">Signup</Link>
            </div>
        </div>
    )
}

export default LoginFormPage;