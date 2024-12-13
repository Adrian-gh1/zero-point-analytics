// frontend/src/components/BusinessFormPage/BusinessFormPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateBusiness, thunkGetUserBusiness } from '../../redux/businesses';
import './BusinessFormPage.css';

function BusinessFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    // const userBusiness = useSelector(state => state.businesses.userBusiness);

    const [formData, setFormData] = useState({
        business_name: '',
        business_address: '',
        business_email: '',
        business_website: '',
        business_description: '',
        business_industry: '',
        business_category: ''
    });

    const [errors, setErrors] = useState({
        business_name: '',
        business_address: '',
        business_email: '',
        business_website: '',
        business_description: '',
        business_industry: '',
        business_category: ''
    });

    useEffect(() => {
        if (sessionUser) {
            dispatch(thunkGetUserBusiness());
        }
    }, [dispatch, sessionUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log('Tracer 2.1:', formData);
        const response = await dispatch(thunkCreateBusiness(formData))
        await dispatch(thunkGetUserBusiness());
        // console.log('Tracer 2.2:', response);
       
        if (response.error) {
            setErrors({
                business_name: response.error.business_name ? response.error.business_name[0] : '',
                business_address: response.error.business_address ? response.error.business_address[0] : '',
                business_email: response.error.business_email ? response.error.business_email[0] : '',
                business_website: response.error.business_website ? response.error.business_website[0] : '',
                business_description: response.error.business_description ? response.error.business_description[0] : '',
                business_industry: response.error.business_industry ? response.error.business_industry[0] : '',
                business_category: response.error.business_category ? response.error.business_category[0] : ''
            });

        } else {
            navigate("/");
        }
    };

    return (
        <div className="business-page-container">
            <div className="business-form-container">
                <h2 className="business-form-heading">Create a Business</h2>

                <form onSubmit={handleSubmit} className="business-form">
                    {['business_name', 'business_address', 'business_email', 'business_website', 'business_description', 'business_industry', 'business_category'].map((field) => (
                        <div key={field} className="business-form-group">
                            <label htmlFor={field} className="business-label">{field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</label>
                            {field === 'business_description' ? (
                                <textarea
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="business-input"
                                />
                            ) : (
                                <input
                                    type={field === 'business_email' ? 'email' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="business-input"
                                    required
                                />
                            )}
                            {errors[field] && <p className="business-error">{errors[field]}</p>}
                        </div>
                    ))}

                    <button type="submit" className="business-submit-button">Create Business</button>
                </form>
            </div>
        </div>
    )
}

export default BusinessFormPage;