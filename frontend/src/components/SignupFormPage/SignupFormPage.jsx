// frontend/src/components/SignupFormPage/SignupFormPage.jsx

// import { useEffect } from 'react';
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkSignup } from '../../redux/session';
import './SignupFormPage.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const sessionUser = useSelector(state => state.session.user);  

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: ''
    });

    // useEffect(() => {

    // }, [])

    // const handleSubmit = async () => {
    //     await dispatch(thunkSignup())
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};

        if (!formData.username) formErrors.username = 'Username is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';
        if (!formData.role) formErrors.role = 'Role is required';

        setErrors(formErrors);

        const response = await dispatch(thunkSignup(formData));
        // await dispatch(thunkSignup(formData));

        if (response.errors) {
            setErrors(response.errors);
        }
        
        else {
            // NOTE: Should Navigate to Creating a Business
            navigate('/');
        }
    };

    // useEffect(() => {
    //     if (sessionUser && sessionUser.id) {
    //         navigate("/");
    //         }
            
    //     if (!sessionUser) {
    //         setErrors("Invalid email or password. Please try again.");
    //     }
    // }, [sessionUser, navigate])

    return (
        // <div>Sign Up Page</div>
        <div className="signup-form-container">
            <h2 className="signup-form-heading">Create Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="signup-form-group">
                    <label htmlFor="username" className="signup-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.username && <p className="signup-error">{errors.username}</p>}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="email" className="signup-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.email && <p className="signup-error">{errors.email}</p>}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.password && <p className="signup-error">{errors.password}</p>}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="firstName" className="signup-label">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.firstName && <p className="signup-error">{errors.firstName}</p>}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="lastName" className="signup-label">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.lastName && <p className="signup-error">{errors.lastName}</p>}
                </div>

                <div className="signup-form-group">
                    <label htmlFor="role" className="signup-label">Role</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    />
                    {errors.role && <p className="signup-error">{errors.role}</p>}
                </div>

                <button type="submit" className="signup-submit-button">Continue</button>
            </form>
        </div>
        
    );
}

export default SignupFormPage;