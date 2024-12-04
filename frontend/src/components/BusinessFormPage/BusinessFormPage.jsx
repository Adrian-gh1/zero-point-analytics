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

        // setErrors({
        //     business_name: '',
        //     business_address: '',
        //     business_email: '',
        //     business_website: '',
        //     business_description: '',
        //     business_industry: '',
        //     business_category: ''
        // });

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
        // <div>Business Form Page</div>
        <div className="business-form-container">
            <h2>Create a Business</h2>

            <form onSubmit={handleSubmit} className="business-form">
                <div className="form-group">
                    <label htmlFor="business_name">Business Name</label>
                    <input
                        type="text"
                        id="business_name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        required
                    />
                    {errors.business_name && <p className="error-message">{errors.business_name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_address">Business Address</label>
                    <input
                        type="text"
                        id="business_address"
                        name="business_address"
                        value={formData.business_address}
                        onChange={handleChange}
                        required
                    />
                    {errors.business_address && <p className="error-message">{errors.business_address}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_email">Business Email</label>
                    <input
                        type="email"
                        id="business_email"
                        name="business_email"
                        value={formData.business_email}
                        onChange={handleChange}
                    />
                    {errors.business_email && <p className="error-message">{errors.business_email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_website">Business Website</label>
                    <input
                        type="text"
                        id="business_website"
                        name="business_website"
                        value={formData.business_website}
                        onChange={handleChange}
                    />
                    {errors.business_website && <p className="error-message">{errors.business_website}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_description">Business Description</label>
                    <textarea
                        id="business_description"
                        name="business_description"
                        value={formData.business_description}
                        onChange={handleChange}
                    />
                    {errors.business_description && <p className="error-message">{errors.business_description}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_industry">Business Industry</label>
                    <input
                        type="text"
                        id="business_industry"
                        name="business_industry"
                        value={formData.business_industry}
                        onChange={handleChange}
                    />
                    {errors.business_industry && <p className="error-message">{errors.business_industry}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="business_category">Business Category</label>
                    <input
                        type="text"
                        id="business_category"
                        name="business_category"
                        value={formData.business_category}
                        onChange={handleChange}
                    />
                    {errors.business_category && <p className="error-message">{errors.business_category}</p>}
                </div>

                <button type="submit">Create Business</button>
            </form>
        </div>
    );
}

export default BusinessFormPage;