// frontend/src/components/BusinessPortfolioPage/BusinessPortfolioPage.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { thunkGetUserBusiness, thunkEditBusiness } from '../../redux/businesses';
import './BusinessPortfolioPage.css';

function BusinessPortfolioPage() {
    const dispatch = useDispatch()
    const userBusiness = useSelector(state => state.businesses.userBusiness);

    const [editMode, setEditMode] = useState(false);
    const [updatedBusiness, setUpdatedBusiness] = useState({});

    useEffect(() => {
        dispatch(thunkGetUserBusiness());
    }, [dispatch]);

    const deleteButtonHandler = async (e) => {
        e.preventDefault();
        // Call Thunk Here
        // Erro Handler Here
    };

    const editButtonHandler = async (e) => {
        e.preventDefault();
        // Call Thunk Here
        // Erro Handler Here
        setEditMode(!editMode);
    };

    const editChangesHandler = (e) => {
        setUpdatedBusiness({
            ...updatedBusiness,
            [e.target.name]: e.target.value
        });
    };

    const saveButtonHandler = async (e) => {
        e.preventDefault();
        await dispatch(thunkEditBusiness(updatedBusiness));
        await dispatch(thunkGetUserBusiness());
        setEditMode(false);
        // Erro Handler Here
    };

    const publishButtonHandler = async (e) => {
        e.preventDefault();
        // Call Thunk Here
        // Erro Handler Here
    };

    // Edit Error Handlers (Default Values)
    const businessName = updatedBusiness.business_name || userBusiness.business_name || '';
    const businessEmail = updatedBusiness.business_email || userBusiness.business_email || '';
    const businessAddress = updatedBusiness.business_address || userBusiness.business_address || '';
    const businessIndustry = updatedBusiness.business_industry || userBusiness.business_industry || '';
    const businessCategory = updatedBusiness.business_category || userBusiness.business_category || '';
    const businessDescription = updatedBusiness.business_description || userBusiness.business_description || '';

    return (
        <div>
            <h2>Business Portfolio Page</h2>
            <div className='top'>

                <div className='top-left'>Business Logo</div>

                <div className='top-center'>
                    <div>My Business</div>

                    {editMode ? (
                        <div>
                            <div>
                                Business Name:
                                <input
                                    type="text"
                                    name="business_name"
                                    value={businessName}
                                    onChange={editChangesHandler}
                                />
                            </div>

                            <div>
                                Business Address:
                                <input
                                    type="text"
                                    name="business_address"
                                    value={businessAddress}
                                    onChange={editChangesHandler}
                                />
                            </div>

                            <div>
                                Business Email:
                                <input
                                    type="text"
                                    name="business_email"
                                    value={businessEmail}
                                    onChange={editChangesHandler}
                                />
                            </div>

                            <div>
                                Business Industry:
                                <input
                                    type="text"
                                    name="business_industry"
                                    value={businessIndustry}
                                    onChange={editChangesHandler}
                                />
                            </div>

                            <div>
                                Business Category:
                                <input
                                    type="text"
                                    name="business_category"
                                    value={businessCategory}
                                    onChange={editChangesHandler}
                                />
                            </div>

                            <div>Connection Status:</div>
                            <div>Status Type:</div>

                        </div>

                    ) : (
                        <div>
                            <div>Business Name: {userBusiness.business_name}</div>
                            <div>Business Address: {userBusiness.business_address}</div>
                            <div>Business Email: {userBusiness.business_email}</div>
                            <div>Business Industry: {userBusiness.business_industry}</div>
                            <div>Business Category: {userBusiness.business_category}</div>
                            <div>Connection Status:</div>
                            <div>Status Type:</div>
                        </div>
                    )}

                </div>

                <div className='top-right'>
                    <div>Connected Business</div>

                    <div>Connected Business Name</div>
                    <div>Connected Contact Info</div>
                    <div>Connected Business Industry</div>
                </div>
            </div>

            <div className='middle'>
                {editMode ? (
                    <div>
                        Business Description:
                        <input
                            type="text"
                            name="business_description"
                            value={businessDescription}
                            onChange={editChangesHandler}
                        />
                    </div>
                ) : (
                    <div>Business Description: {userBusiness.business_description}</div>
                )}

            </div>

            <div className='bottom-right'>
                {editMode ? (
                    <button onClick={saveButtonHandler}>Save Changes</button>
                ) : (
                    <div className='bottom'>
                        <button onClick={deleteButtonHandler}>Delete Button</button>
                        <button onClick={editButtonHandler}>Edit Details</button>
                        <button onClick={publishButtonHandler}>Publish Button</button>
                    </div>
                )}                    
            </div>

            <div>
                <button>
                    + <br/>
                    (Add Service/Request)
                </button>
            </div>

        </div>
    );
}

export default BusinessPortfolioPage;