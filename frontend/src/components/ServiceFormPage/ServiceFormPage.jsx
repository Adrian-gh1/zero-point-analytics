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
        setNewService({ service_name: '', service_description: '', service_type: '', service_tags: '' });
        navigate('/businessPortfolio')
    };

    return (
        <div className="service-form-page">
            <h3>New Service Form</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Service Name:</label>
                    <input
                        type="text"
                        name="service_name"
                        value={newService.service_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Service Description:</label>
                    <input
                        type="text"
                        name="service_description"
                        value={newService.service_description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Service Type:</label>
                    <input
                        type="text"
                        name="service_type"
                        value={newService.service_type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Service Tags:</label>
                    <input
                        type="text"
                        name="service_tags"
                        value={newService.service_tags}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create Service</button>
            </form>
        </div>
    );
}

export default ServiceFormPage;
