// frontend/src/components/BusinessPortfolioPage/BusinessPortfolioPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetUserBusiness, thunkGetBusiness, thunkEditBusiness } from '../../redux/businesses';
import { thunkGetAllBusinessServices, thunkGetBusinessService, thunkEditService, thunkDeleteService } from '../../redux/services';
import { thunkGetAllBusinessConnections, thunkGetBusinessConnection } from '../../redux/connections';
import './BusinessPortfolioPage.css';

function BusinessPortfolioPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedBusiness = useSelector(state => state.businesses.selectedBusiness);
    // const userBusiness = useSelector(state => state.businesses.userBusiness);
    const allBusinessServices = useSelector(state => state.services.allBusinessServices);
    // const businessService = useSelector(state => state.services.businessServices);
    const businessConnection = useSelector(state => state.connections.businessConnection);
    const allBusinessConnections = useSelector(state => state.connections.allBusinessConnections);

    const [editMode, setEditMode] = useState(false);
    const [updatedBusiness, setUpdatedBusiness] = useState({});
    const [updateService, setUpdateService] = useState({});

    useEffect(() => {
        dispatch(thunkGetUserBusiness());
        dispatch(thunkGetBusinessService());
        dispatch(thunkGetBusinessConnection());
        dispatch(thunkGetAllBusinessServices());
        dispatch(thunkGetAllBusinessConnections());
    }, [dispatch]);

    useEffect(() => {
        if (businessConnection?.business_id_2 && !selectedBusiness?.id) { 
            dispatch(thunkGetBusiness(businessConnection.business_id_2)); 
        }
    }, [dispatch, businessConnection?.business_id_2, selectedBusiness?.id]);

    useEffect(() => {
        if (Array.isArray(allBusinessServices)) {
        // if (allBusinessServices) {
            setUpdateService(
                allBusinessServices.reduce((acc, service) => {
                    acc[service.id] = { ...service };
                    return acc;
                }, {})
            );
        }
    }, [allBusinessServices]);

    const deleteButtonHandler = async (e, serviceId) => {
        e.preventDefault();
        await dispatch(thunkDeleteService(serviceId));
        await dispatch(thunkGetAllBusinessServices());
    };

    const editButtonHandler = async (e) => {
        e.preventDefault();
        setEditMode(!editMode);
    };

    const editServiceChangeHandler = (e, serviceId) => {
        setUpdateService({
            ...updateService,
            [serviceId]: {
                ...updateService[serviceId],
                [e.target.name]: e.target.value,
            }
        });
    };

    const saveButtonHandler = async (e) => {
        e.preventDefault();
        await dispatch(thunkEditBusiness(updatedBusiness));
        await dispatch(thunkGetUserBusiness());

        for (const serviceId in updateService) {
            const serviceData = updateService[serviceId];

            await dispatch(thunkEditService(serviceId, serviceData));
            await dispatch(thunkGetAllBusinessServices());
        }
        setEditMode(false);
    };

    const publishButtonHandler = async (e, serviceId) => {
        e.preventDefault();

        const updatedService = { ...updateService[serviceId], service_live: true };
        setUpdateService({
            ...updateService,
            [serviceId]: updatedService,
        });

        await dispatch(thunkEditService(serviceId, updatedService));


        navigate('/')
        // Maybe navigate to the BusinessDetailsPage: navigate('/business/:businessId')
    };

    const createServiceHandler = (e) => {
        e.preventDefault();
        navigate('/serviceForm');
    };

    return (
        <div className="business-portfolio-page">
            <div>
                <h2>Business Portfolio Page</h2>

                <div className="portfolio-background">
                {/* <div> */}
                    {allBusinessServices && allBusinessServices.length > 0 ? (
                        allBusinessServices.map((service) => (
                            <div key={service.id}>
                                <div className='top'>
                                    
                                    <div className='top-left'>Business Logo</div>

                                    <div className='top-center'>
                                        <div>Service Details</div>

                                        <div>
                                            {editMode ? (
                                                <div>
                                                    <div>
                                                        Service Name:
                                                        <input
                                                            type="text"
                                                            name="service_name"
                                                            value={updateService[service.id] ? updateService[service.id].service_name : service.service_name}
                                                            onChange={(e) => editServiceChangeHandler(e, service.id)}
                                                        />
                                                    </div>

                                                    <div>
                                                        Service Industry:
                                                        <input
                                                            type="text"
                                                            name="service_industry"
                                                            value={updateService[service.id] ? updateService[service.id].service_industry : service.service_industry}
                                                            onChange={(e) => editServiceChangeHandler(e, service.id)}
                                                        />
                                                    </div>

                                                    <div>
                                                        Service Tags:
                                                        <input
                                                            type="text"
                                                            name="service_tags"
                                                            value={updateService[service.id] ? updateService[service.id].service_tags : service.service_tags}
                                                            onChange={(e) => editServiceChangeHandler(e, service.id)}
                                                        />
                                                    </div>

                                                    <div>Service Status: {service.service_live ? "Live" : "Open"}</div>
                                                    <div>Service Type: {service.service_type}</div>

                                                </div>                                        

                                            ) : (
                                                <div>
                                                    <div>Service Name: {service.service_name}</div>
                                                    <div>Service Industry: {service.service_industry}</div>
                                                    <div>Service Tags: {service.service_tags}</div>
                                                    {/* NOTE: If service_live is true connection */}
                                                    <div>Service Status: {service.service_live ? "Live" : "Open"}</div>
                                                    <div>Service Type: {service.service_type}</div>
                                                </div>
                                            )}
                                        </div> 

                                        <div>
                                            {/* <button>Service Details</button> */}
                                        </div>
                                        
                                    </div>

                                    <div className='top-right'>
                                        {allBusinessConnections && allBusinessConnections.length > 0 ? (
                                            allBusinessConnections.map((connection) => (
                                                <div key={connection.id}>
                                                    <div>Connection Details</div>


                                                    {service.id === connection.id ? (
                                                    // {service.id === business.id ? () : ()}
                                                        <div>
                                                            {/* <div>Business Name: {selectedBusiness?.business_name}</div> */}
                                                            {/* <div>Contact Info: {selectedBusiness?.business_email}</div> */}
                                                        {/* <div>Industry: {selectedBusiness?.business_industry}</div> */}
                                                            <div>Connection Status: {connection.id}</div>
                                                            <div>Connection Status: {connection.connection_status}</div>
                                                            <div>Connection Type: {connection.connection_type}</div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div>Connection Status: N/A</div>
                                                            <div>Connection Status: Inactive</div>
                                                            <div>Connection Type: N/A</div>
                                                        </div>
                                                    )}

                                                    {/* <div>Connection Status: {service.id === connection.id ? connection.id : 'N/A'}</div>
                                                    <div>Connection Status: {service.id === connection.id ? connection.connection_status : 'N/A'}</div>
                                                    <div>Connection Type: {service.id === connection.id ? connection.connection_type : 'N/A'}</div> */}

                                                    {/* <div>Business Name: {selectedBusiness?.business_name}</div> */}
                                                    {/* <div>Contact Info: {selectedBusiness?.business_email}</div> */}
                                                    {/* <div>Industry: {selectedBusiness?.business_industry}</div> */}
                                                    {/* <div>Connection Status: {businessConnection.connection_status}</div> */}
                                                    {/* <div>Connection Type: {businessConnection.connection_type}</div> */}

                                                    <div>
                                                        {/* <button>Business Details</button> */}
                                                    </div>

                                                </div>
                                            ))
                                        ) : (
                                            <div></div>
                                        )}

                                    </div>

                                </div>

                                <div className='middle'>
                                    {editMode ? (
                                        <div>
                                            Service Description:
                                            <input
                                                type="text"
                                                name="service_description"
                                                value={updateService[service.id] ? updateService[service.id].service_description : service.service_description}
                                                onChange={(e) => editServiceChangeHandler(e, service.id)}
                                            />
                                        </div>
                                    ) : (
                                        <div>Service Description: {service.service_description}</div>
                                    )}

                                </div>

                                <div className='bottom'>
                                        {editMode ? (
                                            <div className='bottom-right'>
                                                    <button onClick={saveButtonHandler}>Save Changes</button>                                    
                                            </div>
                                        ) : (
                                            <div className='bottom-right'>
                                                    <button onClick={(e) => deleteButtonHandler(e, service.id)}>Delete Service</button>
                                                    <button onClick={editButtonHandler}>Edit Details</button>
                                                    <button onClick={(e) => publishButtonHandler(e, service.id)} disabled={service.service_live}>Advertise</button>
                                            </div>
                                        )}              
                                </div>

                            </div>                                
                        ))
                    ) : (
                        // <p>No Services Available.</p>
                        null
                    )}
                </div>

                <div>
                    <button onClick={createServiceHandler}>
                        + <br />
                        Add Service/Request
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BusinessPortfolioPage;