// frontend/src/components/ServiceFormPage/ServiceFormPage.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateService } from '../../redux/services';
import './ServiceFormPage.css';

function ServiceFormPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newService, setNewService] = useState({
        service_name: '',
        service_live: false,
        service_industry: '',
        service_description: '',
        service_type: '',
        service_tags: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(thunkCreateService(newService))
        setNewService({
            service_name: '',
            service_live: false,
            service_industry: '',
            service_description: '',
            service_type: '',
            service_tags: '' 
        });
        navigate('/businessPortfolio')
    };

    return (
        <div className="service-form-container">
            <h3 className="service-form-heading">New Service Form</h3>
            <form className="service-form" onSubmit={handleSubmit}>
                <div className="service-input-group">
                    <label htmlFor="service_name" className="service-label">Service Name:</label>
                    <input
                        type="text"
                        name="service_name"
                        id="service_name"
                        value={newService.service_name}
                        onChange={handleChange}
                        className="service-input"
                    />
                </div>
                <div className="service-input-group">
                    <label htmlFor="service_industry" className="service-label">Service Industry:</label>
                    <input
                        type="text"
                        name="service_industry"
                        id="service_industry"
                        value={newService.service_industry}
                        onChange={handleChange}
                        className="service-input"
                    />
                </div>
                <div className="service-input-group">
                    <label htmlFor="service_description" className="service-label">Service Description:</label>
                    <input
                        type="text"
                        name="service_description"
                        id="service_description"
                        value={newService.service_description}
                        onChange={handleChange}
                        className="service-input"
                    />
                </div>
                <div className="service-input-group">
                    <label htmlFor="service_type" className="service-label">Service Type:</label>
                    <select
                        name="service_type"
                        id="service_type"
                        value={newService.service_type}
                        onChange={handleChange}
                        className="service-select"
                    >
                        <option value="">Select a service type</option>
                        <option value="Offer">Offer</option>
                        <option value="Request">Request</option>
                    </select>
                </div>
                <div className="service-input-group">
                    <label htmlFor="service_tags" className="service-label">Service Tags:</label>
                    <input
                        type="text"
                        name="service_tags"
                        id="service_tags"
                        value={newService.service_tags}
                        onChange={handleChange}
                        className="service-input"
                    />
                </div>
                <button type="submit" className="service-submit-button">Create Service</button>
            </form>
        </div>
    );
}

export default ServiceFormPage;
