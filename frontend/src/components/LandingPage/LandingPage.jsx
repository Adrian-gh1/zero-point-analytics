// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetUserBusiness } from '../../redux/businesses';
import { thunkGetAllServices } from '../../redux/services';
import './LandingPage.css';

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const services = useSelector(state => state.services.services);

    // Dynamic States
    useEffect(() => {
        if (sessionUser && sessionUser?.id) {
            dispatch(thunkGetUserBusiness());
        }

        dispatch(thunkGetAllServices());
    }, [dispatch, sessionUser]);

    const serviceHandler = (serviceId) => {
        console.log('Tracer 3.1:', !!sessionUser, !!sessionUser?.id, !!userBusiness?.id);
        console.log('Tracer 3.2:', sessionUser, sessionUser?.id, userBusiness?.id);
        
        if (sessionUser && sessionUser?.id && userBusiness?.id) {
            navigate(`service/${serviceId}`);
        }
        if (!sessionUser?.id) {
            navigate('/login');
        }
        if (userBusiness.error) {
            navigate('/businessForm');
        }
    };

    return (
        <div className="landing-page-container">
            {/* <div className="landing-page-header"><h2>Landing Page</h2></div> */}
            {/* <div className="filter-bar">Filter Bar</div> */}
            {/* <h2>Company List</h2> */}
            <div className="business-list">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="business-item"
                        onClick={() => serviceHandler(service.id)}
                    >
                        <div className="business-info">
                            <h3>{service.service_name}</h3>
                            <div>{service.service_industry}</div>
                            <p>{service.service_description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LandingPage;