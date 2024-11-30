// frontend/src/components/BusinessFormPage/BusinessFormPage.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateBusiness } from '../../redux/businesses';
import './BusinessFormPage.css';

function BusinessFormPage() {
    const dispatch = useDispatch();

    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [businessIndustry, setBusinessIndustry] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');

    // const [error, setError] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');

    const [error] = useState('');
    const [successMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            business_name: businessName,
            business_address: businessAddress,
            business_email: businessEmail,
            business_website: businessWebsite,
            business_description: businessDescription,
            business_industry: businessIndustry,
            business_category: businessCategory
        };

        await dispatch(thunkCreateBusiness(formData))
    };

    return (
        // <div>Business Form Page</div>
        <div className="business-form-container">
            <h2>Create a Business</h2>

            {/* Display success or error message */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="business-form">
                <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessAddress">Business Address</label>
                <input
                    type="text"
                    id="businessAddress"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessEmail">Business Email</label>
                <input
                    type="email"
                    id="businessEmail"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessWebsite">Business Website</label>
                <input
                    type="text"
                    id="businessWebsite"
                    value={businessWebsite}
                    onChange={(e) => setBusinessWebsite(e.target.value)}
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessDescription">Business Description</label>
                <textarea
                    id="businessDescription"
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessIndustry">Business Industry</label>
                <input
                    type="text"
                    id="businessIndustry"
                    value={businessIndustry}
                    onChange={(e) => setBusinessIndustry(e.target.value)}
                />
                </div>

                <div className="form-group">
                <label htmlFor="businessCategory">Business Category</label>
                <input
                    type="text"
                    id="businessCategory"
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                />
                </div>

                <button type="submit">Create Business</button>
            </form>
        </div>
    );
}

export default BusinessFormPage;