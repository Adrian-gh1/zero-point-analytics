// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetAllBusinesses } from '../../redux/businesses';
import './LandingPage.css';

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const businesses = useSelector(state => state.businesses.businesses);

    useEffect(() => {
        dispatch(thunkGetAllBusinesses())
    }, [dispatch]);

    const businessHandler = (businessId) => {
        console.log(`Navigate to: ${businessId}`);
        navigate(`business/${businessId}`);
    };

    return (
        <div className="landing-page-container">
            <div className="landing-page-header"><h2>Landing Page</h2></div>
            <div className="filter-bar">Filter Bar</div>
            <h2>Company List</h2>
            <div className="business-list">
                {businesses.map((business) => (
                    <div
                        key={business.id}
                        className="business-item"
                        onClick={() => businessHandler(business.id)}
                    >
                        <div className="business-info">
                            <h3>{business.business_name}</h3>
                            <p>{business.business_description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;