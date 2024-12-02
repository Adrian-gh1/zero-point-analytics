// frontend/src/components/ServiceDetailsPage/ServiceDetailsPage.jsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetBusiness, thunkGetUserBusiness } from '../../redux/businesses';
import { thunkGetService, thunkGetBusinessService } from '../../redux/services';
import { thunkCreateConnection } from '../../redux/connections';
import './ServiceDetailsPage.css';

function ServiceDetailsPage() {
    const dispatch = useDispatch();
    const selectedBusiness = useSelector(state => state.businesses.selectedBusiness);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const selectedService = useSelector(state => state.services.selectedService)
    const businessService = useSelector(state => state.services.businessService)
    const { serviceId } = useParams();

    // useEffect(() => {
    //     dispatch(thunkGetBusiness(businessId));
    //     dispatch(thunkGetUserBusiness());
    //     dispatch(thunkGetService(serviceId));
    //     dispatch(thunkGetBusinessService());
    // }, [dispatch, businessId]);

    // Fetch service and user business data
    useEffect(() => {
        if (serviceId) {
            dispatch(thunkGetService(serviceId));
        }
    }, [dispatch, serviceId]);

     // Fetch business data when selectedService changes
     useEffect(() => {
        if (selectedService) {
            const businessId = selectedService.business_id;
            if (businessId) {
                dispatch(thunkGetBusiness(businessId));
                dispatch(thunkGetBusinessService()); // Assuming this fetches data related to the service's business
            }
            dispatch(thunkGetUserBusiness()); // Fetch user business data
        }
    }, [dispatch, selectedService]);

    if (!selectedBusiness || !userBusiness || !selectedService || !businessService) {
        return <div>Loading data...</div>;
    }

    const handleSendConnection = async () => {
        const connectionData = {
            business_id_1: userBusiness.id, // Your business ID
            business_id_2: selectedBusiness.id, // Selected business ID
            connection_type: 'Partnership', // Modify as needed
            connection_status: 'Pending', // Example status
            connection_description: `Request for partnership regarding ${selectedService.service_name}`,
        };

        await dispatch(thunkCreateConnection(connectionData));

    }

    return (
        <div>
            <div className="business-comparison-container">
                <div className="business-comparison">
                    <div className="business-column">
                        <h3>Selected Business: {selectedBusiness.business_name}</h3>
                        <div className="business-detail">
                            <strong>Name:</strong> {selectedBusiness.business_name}
                        </div>
                        <div className="business-detail">
                            <strong>Address:</strong> {selectedBusiness.business_address}
                        </div>
                        <div className="business-detail">
                            <strong>Email:</strong> {selectedBusiness.business_email}
                        </div>
                        <div className="business-detail">
                            <strong>Website:</strong> {selectedBusiness.business_website}
                        </div>
                        <div className="business-detail">
                            <strong>Description:</strong> {selectedBusiness.business_description}
                        </div>
                        <div className="business-detail">
                            <strong>Industry:</strong> {selectedBusiness.business_industry}
                        </div>
                        <div className="business-detail">
                            <strong>Category:</strong> {selectedBusiness.business_category}
                        </div>
                    </div>

                    <div className="button-container">
                        <button className="action-button" onClick={handleSendConnection}>Send Connection</button>
                        <button className="action-button">Edit Details</button>
                        <button className="action-button">Cancellation Request</button>
                    </div>

                    <div className="business-column">
                        <h3>Your Business: {userBusiness.business_name}</h3>
                        <div className="business-detail">
                            <strong>Name:</strong> {userBusiness.business_name}
                        </div>
                        <div className="business-detail">
                            <strong>Address:</strong> {userBusiness.business_address}
                        </div>
                        <div className="business-detail">
                            <strong>Email:</strong> {userBusiness.business_email}
                        </div>
                        <div className="business-detail">
                            <strong>Website:</strong> {userBusiness.business_website}
                        </div>
                        <div className="business-detail">
                            <strong>Description:</strong> {userBusiness.business_description}
                        </div>
                        <div className="business-detail">
                            <strong>Industry:</strong> {userBusiness.business_industry}
                        </div>
                        <div className="business-detail">
                            <strong>Category:</strong> {userBusiness.business_category}
                        </div>
                    </div>

                </div>
            </div>

            {/* New service data section positioned below the business columns */}
            <div className="service-section">
                <h3>Service Details: {selectedService.service_name}</h3>
                <div className="service-detail">
                    <strong>Industry:</strong> {selectedService.service_industry}
                </div>
                <div className="service-detail">
                    <strong>Tags:</strong> {selectedService.service_tags}
                </div>
                <div className="service-detail">
                    <strong>Service Status:</strong> {selectedService.service_live ? "Live" : "Open"}
                </div>
                <div className="service-detail">
                    <strong>Service Type:</strong> {selectedService.service_type}
                </div>
                <div className="service-detail">
                    <strong>Description:</strong> {selectedService.service_description}
                </div>
            </div>

        </div>
    );
}

export default ServiceDetailsPage;