// frontend/src/components/BusinessDetailsPage/BusinessDetailsPage.jsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkGetBusiness, thunkGetUserBusiness } from '../../redux/businesses';
import './BusinessDetailsPage.css'

function BusinessDetailsPage() {
    const dispatch = useDispatch();
    const selectedBusiness = useSelector(state => state.businesses.selectedBusiness);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const { businessId } = useParams();

    useEffect(() => {
        dispatch(thunkGetBusiness(businessId));
        dispatch(thunkGetUserBusiness());
    }, [dispatch, businessId]);

    if (!selectedBusiness) {
        return <div>Loading business details...</div>;
    }

    return (
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
                    <button className="action-button">Send Connection</button>
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
    );
}

export default BusinessDetailsPage;