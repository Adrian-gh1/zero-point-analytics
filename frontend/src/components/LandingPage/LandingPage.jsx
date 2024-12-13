// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect, useState } from 'react';
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


    // Image slideshow state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Array of image paths for the slideshow
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
            navigate(`service/${serviceId}`);
        }
        if (!sessionUser?.id) {
            navigate('/login');
        }
        if (userBusiness.error) {
            navigate('/businessForm');
        }
    };

    const getStartedButtonHandler = () => {
        if (!sessionUser?.id) {
            // If user is not logged in, navigate to login page
            navigate('/signup');
        } else {
            // If user is logged in, you can handle further navigation or logic here
            // For example, navigate to a dashboard or another page:
            navigate('/businessPortfolio');
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
            className="landing-page-container"
            style={{
                backgroundImage: `url(${imagePaths[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 'calc(100vh - 70px)',
            }}
        >
            {/* <div className="filter-bar">Filter Bar</div> */}
            <h1>Welcome to Zero Point</h1>
            <h2>Business to Business Connections</h2>
            <h3>Grow your Business with us</h3>

            <button
                className="get-started-button"
                onClick={getStartedButtonHandler}
            >
                GET STARTED
            </button>
        </div>
    );
}

export default LandingPage;