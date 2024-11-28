// frontend/src/components/Navigation/Navigation.jsx

import { useNavigate } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import './Navigation.css';

function Navigation() {
    const navigate = useNavigate();

    const logoHandler = () => {
        navigate('/');
    };

    return (
        <div className="navbar">

            <div className="logo" onClick={logoHandler}>
                <FaBuilding /> Zero Point Analytics
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>

            <div>
                <ProfileMenu/>
            </div>
            
        </div>
    )
}

export default Navigation;