// frontend/src/components/ServiceDetailsPage/ServiceDetailsPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetBusiness } from '../../redux/businesses';
import { thunkGetService, thunkGetBusinessService } from '../../redux/services';
import { thunkCreateConnection, thunkGetAllBusinessConnections, thunkDeleteConnection } from '../../redux/connections';
import LoadingModal from '../LoadingModal';
import './ServiceDetailsPage.css';

function ServiceDetailsPage() {
    const dispatch = useDispatch();
    const { serviceId } = useParams();

    const selectedBusiness = useSelector(state => state.businesses.selectedBusiness);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const selectedService = useSelector(state => state.services.selectedService);
    const businessService = useSelector(state => state.services.businessService);
    const allBusinessConnections = useSelector(state => state.connections.allBusinessConnections);

    const [loadingState, setLoadingState] = useState(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // useEffect(() => {
    //     if (serviceId) {
    //         dispatch(thunkGetService(serviceId));
    //     }
    // }, [dispatch, serviceId]);

    // NOTE: Loading State Logic
    useEffect(() => {
        if (serviceId) {
            setLoadingState(true);
            dispatch(thunkGetService(serviceId))
                .then(() => setLoadingState(false))
                .catch(() => setLoadingState(false));
        }
    }, [dispatch, serviceId]);
    

    useEffect(() => {
        if (userBusiness) {
            dispatch(thunkGetAllBusinessConnections());
        }
    }, [dispatch, userBusiness]);

    useEffect(() => {
        if (Array.isArray(allBusinessConnections) && serviceId) {
        // if (allBusinessConnections && serviceId) {
            const connectionExists = allBusinessConnections.some(connection => connection.service_id === parseInt(serviceId));
            setIsButtonDisabled(connectionExists);
        }
    }, [allBusinessConnections, serviceId]);

    // NOTE: Loading State Logic
    useEffect(() => {
        if (selectedService) {
            const businessId = selectedService.business_id;
            if (businessId) {
                setLoadingState(true);
                dispatch(thunkGetBusiness(businessId))
                    .then(() => {
                        dispatch(thunkGetBusinessService());
                        setLoadingState(false);
                    })
                    .catch(() => setLoadingState(false));
            }
        }
    }, [dispatch, selectedService]);

    // if (!selectedBusiness || !userBusiness || !selectedService || !businessService) {
    //     return <div>Loading data...</div>;
    // }

    // NOTE: Loading State Logic
    if (loadingState || !selectedBusiness || !userBusiness || !selectedService || !businessService) {
        return <LoadingModal />;
    }
    

    const sendConnectionHandler = async () => {
        const connectionData = {
            service_id: serviceId,
            business_id_1: selectedBusiness.id, // Your business ID (It should be the ID of the Connection Creater)
            business_id_2: userBusiness.id, // Selected business ID (It should be the ID of the Service Creator)
            connection_type: 'Partnership',
            connection_status: 'Pending',
            connection_description: `Request for partnership regarding ${selectedService.service_name}`,
        }; // NOTE: Flip business_id_1 and business_id_2 to match seed data

        await dispatch(thunkCreateConnection(connectionData));
        await dispatch(thunkGetAllBusinessConnections());
    };

    const deleteButtonHandler = async (connectionId) => {
        await dispatch(thunkDeleteConnection(connectionId));
        await dispatch(thunkGetAllBusinessConnections());
    };

    return (
        <div>
            <div className="business-comparison-container">
                <div className="business-comparison">
                    <div className="business-column">
                        {/* <h3>Selected Business: {selectedBusiness.business_name}</h3> */}
                        <h3>{selectedBusiness.business_name}</h3>
                        <div className="business-detail">
                            {/* <strong>Name:</strong> {selectedBusiness.business_name} */}
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
                        <button className="action-button" onClick={sendConnectionHandler} disabled={isButtonDisabled}>Send Connection</button>
                        {/* <button className="action-button">Edit Details</button> */}

                        {allBusinessConnections?.length ? (
                            allBusinessConnections?.map((connection) => (
                                // connection.service_id === parseInt(serviceId) && (
                                connection.service_id === parseInt(serviceId) || !connection.service_id ? (
                                    // <div>
                                        // {/* {console.log('Tracer 1.1', )} */}
                                        <button
                                            key={connection.id}
                                            className="action-button"
                                            onClick={() => deleteButtonHandler(connection.id)}
                                            disabled={false}
                                        >
                                            Cancellation Request
                                        </button>
                                    // </div>                
                                ) : null
                            ))

                        ) : (
                            // <p>No connections available</p>
                            <button className="action-button" disabled>
                                Cancellation Request
                            </button>
                        )}


                    </div>

                    <div className="business-column">
                        {/* <h3>Your Business: {userBusiness.business_name}</h3> */}
                        <h3>{userBusiness.business_name}</h3>
                        <div className="business-detail">
                            {/* <strong>Name:</strong> {userBusiness.business_name} */}
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
                        {/* <div className="business-detail">

                        </div> */}
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