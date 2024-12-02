// frontend/src/components/BusinessPortfolioPage/BusinessPortfolioPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetUserBusiness, thunkGetBusiness, thunkEditBusiness } from '../../redux/businesses';
import { thunkGetAllBusinessServices, thunkGetBusinessService, thunkEditService, thunkDeleteService } from '../../redux/services';
import { thunkGetBusinessConnection } from '../../redux/connections';
import './BusinessPortfolioPage.css';

function BusinessPortfolioPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedBusiness = useSelector(state => state.businesses.selectedBusiness);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const allBusinessServices = useSelector(state => state.services.allBusinessServices);
    // const businessService = useSelector(state => state.services.businessServices);
    const businessConnection = useSelector(state => state.connections.businessConnection)

    const [editMode, setEditMode] = useState(false);
    const [updatedBusiness, setUpdatedBusiness] = useState({});
    const [updateService, setUpdateService] = useState({});

    useEffect(() => {
        dispatch(thunkGetUserBusiness());
        dispatch(thunkGetBusinessService());
        dispatch(thunkGetBusinessConnection());
        dispatch(thunkGetAllBusinessServices());
    }, [dispatch]);

    useEffect(() => {
        if (businessConnection?.business_id_2 && !selectedBusiness?.id) { 
            dispatch(thunkGetBusiness(businessConnection.business_id_2)); 
        }
    }, [dispatch, businessConnection?.business_id_2, selectedBusiness?.id]);

    useEffect(() => {
        if (allBusinessServices) {
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

    const editBusinessChangeHandler = (e) => {
        setUpdatedBusiness({
            ...updatedBusiness,
            [e.target.name]: e.target.value
        });
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

        // Step 1: Update the local state to reflect that the service is live.
        const updatedService = { ...updateService[serviceId], service_live: true };
        setUpdateService({
            ...updateService,
            [serviceId]: updatedService,
        });

        // Step 2: Dispatch an action to update the service on the backend.
        await dispatch(thunkEditService(serviceId, updatedService));


        navigate('/')
        // Maybe navigate to the BusinessDetailsPage: navigate('/business/:businessId')
    };

    const createServiceHandler = (e) => {
        e.preventDefault();
        navigate('/serviceForm');
    };
    
    // Edit Error Handlers (Default Values)
    const businessName = updatedBusiness.business_name || userBusiness.business_name || '';
    const businessEmail = updatedBusiness.business_email || userBusiness.business_email || '';
    const businessAddress = updatedBusiness.business_address || userBusiness.business_address || '';
    const businessIndustry = updatedBusiness.business_industry || userBusiness.business_industry || '';
    const businessCategory = updatedBusiness.business_category || userBusiness.business_category || '';
    // const businessDescription = updatedBusiness.business_description || userBusiness.business_description || '';


    return (
        <div>
            <h2>Business Portfolio Page</h2>

            <div className="portfolio-background">
            {/* <div> */}
                {/* {allBusinessServices && allBusinessServices.length > 0 ? ( */}
                    {allBusinessServices.map((service) => (
                        <div key={service.id}>
                            <div className='top'>
                                
                                <div className='top-left'>Business Logo</div>

                                <div className='top-center'>
                                    <div>My Business</div>

                                    <div>
                                        {editMode ? (
                                            <div>
                                                <div>
                                                    Business Name:
                                                    <input
                                                        type="text"
                                                        name="business_name"
                                                        value={businessName}
                                                        onChange={(e) => editServiceChangeHandler(e, service.id)}
                                                    />
                                                </div>

                                                <div>
                                                    Business Address:
                                                    <input
                                                        type="text"
                                                        name="business_address"
                                                        value={businessAddress}
                                                        onChange={editBusinessChangeHandler}
                                                    />
                                                </div>

                                                <div>
                                                    Business Email:
                                                    <input
                                                        type="text"
                                                        name="business_email"
                                                        value={businessEmail}
                                                        onChange={editBusinessChangeHandler}
                                                    />
                                                </div>

                                                <div>
                                                    Business Industry:
                                                    <input
                                                        type="text"
                                                        name="business_industry"
                                                        value={businessIndustry}
                                                        onChange={editBusinessChangeHandler}
                                                    />
                                                </div>

                                                <div>
                                                    Business Category:
                                                    <input
                                                        type="text"
                                                        name="business_category"
                                                        value={businessCategory}
                                                        onChange={editBusinessChangeHandler}
                                                    />
                                                </div>

                                                <div>Connection Status: {businessConnection.connection_status}</div>
                                                <div>Connection Type: {businessConnection.connection_type}</div>


                                            </div>                                        

                                        ) : (
                                            <div>
                                                <div>Business Name: {userBusiness.business_name}</div>
                                                <div>Business Address: {userBusiness.business_address}</div>
                                                <div>Business Email: {userBusiness.business_email}</div>
                                                <div>Business Industry: {userBusiness.business_industry}</div>
                                                <div>Business Category: {userBusiness.business_category}</div>
                                                <div>Connection Status: {businessConnection.connection_status}</div>
                                                <div>Connection Type: {businessConnection.connection_type}</div>
                                            </div>
                                        )}
                                    </div> 
                                    
                                </div>

                                <div className='top-right'>
                                    <div>Connected Business</div>

                                    <div>Connected Business Name: {selectedBusiness?.business_name}</div>
                                    <div>Connected Contact Info: {selectedBusiness?.business_email}</div>
                                    <div>Connected Business Industry: {selectedBusiness?.business_industry}</div>

                                    <div>
                                        <button>Connection Details</button>
                                    </div>
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
                    ))}
            </div>

            <div>
                <button onClick={createServiceHandler}>
                    + <br />
                    Add Service/Request
                </button>
            </div>

        </div>
    );
}

export default BusinessPortfolioPage;