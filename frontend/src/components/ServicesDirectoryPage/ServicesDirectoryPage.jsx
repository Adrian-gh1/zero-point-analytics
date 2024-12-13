// frontend/src/components/ServicesDirectoryPage/ServicesDirectoryPage.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetUserBusiness } from '../../redux/businesses';
import { thunkGetAllServices } from '../../redux/services';
import './ServicesDirectoryPage.css';

function ServicesDirectoryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const userBusiness = useSelector(state => state.businesses.userBusiness);
    const services = useSelector(state => state.services.services);

    const backgroundImage = '/images/BackgroundImages/image1.png';

    // Dynamic States
    useEffect(() => {
        if (sessionUser && sessionUser?.id) {
            dispatch(thunkGetUserBusiness());
        }

        dispatch(thunkGetAllServices());
    }, [dispatch, sessionUser]);


    // Image slideshow state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image paths for the slideshow
    // NOTE: Just for the services page, use a single fied photo
    const imagePaths = [
        '/images/LandingPageImages/image1.png',
        '/images/LandingPageImages/image2.png',
        '/images/LandingPageImages/image3.png',
        '/images/LandingPageImages/image4.png',
    ];

    // Update background image at intervals
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagePaths.length);
        }, 5000); // Change image every 3 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, [imagePaths.length]);


    const serviceHandler = (serviceId) => {
        // console.log('Tracer 3.1:', !!sessionUser, !!sessionUser?.id, !!userBusiness?.id);
        // console.log('Tracer 3.2:', sessionUser, sessionUser?.id, userBusiness?.id);
        
        if (sessionUser && sessionUser?.id && userBusiness?.id) {
            navigate(`/service/${serviceId}`);
        }
        if (!sessionUser?.id) {
            navigate('/login');
        }
        if (userBusiness.error) {
            navigate('/businessForm');
        }
    };

    // NOTE: Removes any services from view that belong to the user.
    // NOTE: Removes any services that aren't made public/published
    // NOTE: The user can view their services on the Business Portfolio.
    const filteredServices = services.filter(service => 
        service.user_id !== sessionUser?.id && service.service_live === true
    );

    return (
        <div
            className="service-directory-page-container"
            style={{
                // backgroundImage: `url(${imagePaths[currentImageIndex]})`,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // backgroundAttachment: 'fixed',
                height: 'calc(100vh - 70px)',
            }}
        >
            <div className="service-list">
                {filteredServices.map((service) => (
                    <div
                        key={service.id}
                        className="service-item"
                        onClick={() => serviceHandler(service.id)}
                    >
                        <div className="service-info">
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

export default ServicesDirectoryPage;