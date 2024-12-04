// frontend/src/components/SignupFormPage/SignupFormPage.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { thunkSignup } from '../../redux/session';
import './SignupFormPage.css';

function SignupFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Tracer 1.1:', formData);
        const response = await dispatch(thunkSignup(formData));
        // console.log('Tracer 1.2:', response);
        // console.log('Tracer 1.3:', response.error);

        if (response.error) {
            setErrors({
                username: response.error.username ? response.error.username[0] : '',
                email: response.error.email ? response.error.email[0] : '',
                password: response.error.password ? response.error.password[0] : '',
                firstName: response.error.firstName ? response.error.firstName[0] : '',
                lastName: response.error.lastName ? response.error.lastName[0] : '',
                role: response.error.role ? response.error.role[0] : ''
            });  

        } else {
            navigate("/businessForm");
        }
    };

    return (
        // <div>Sign Up Page</div>
        <div className="signup-form-container">
            <h2 className="signup-form-heading">Create Account</h2>
            {/* <form onSubmit={handleSubmit} className="signup-form"> */}
            <form 
                className="signup-form"
                onSubmit={handleSubmit} 
                // onClick={(e) => {
                //     if (e.target !== e.currentTarget) {
                //         handleSubmit(e);
                //     }
                // }}
            >

                {['username', 'email', 'password', 'firstName', 'lastName', 'role'].map((field) => (
                    <div key={field} className="signup-form-group">
                        {/* {console.log('Tracer 1.5:', field)} */}
                        <label htmlFor={field} className="signup-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            {/* {console.log('Tracer 1.6:', field.charAt(0).toUpperCase())} */}
                            {/* {console.log('Tracer 1.7:', field.slice(1))} */}
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="signup-input"
                            required
                        />

                        {/* {console.log('Tracer 1.8:', errors, errors[field])}
                        {console.log('Tracer 1.9:', field)} */}
                        {errors[field] && <p className="signup-error">{errors[field]}</p>}

                    </div>
                ))}

                {/* <button type="submit" className="signup-submit-button">Continue</button> */}
                <button type="submit" className="signup-submit-button">Submit</button>
            </form>

            <div className="signup-footer">
                Have an account? 
                <Link to="/login" className="login-link">Login</Link>
            </div>

        </div>
        
    );
}

export default SignupFormPage;