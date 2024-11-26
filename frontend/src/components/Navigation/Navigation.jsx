// frontend/src/components/Navigation/Navigation.jsx

import { FaBuilding } from 'react-icons/fa';
import './Navigation.css';

function Navigation() {

    return (
        <div className="navbar">
            <div className="logo">
                <FaBuilding /> Zero Point Analytics
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="profile">
                <img src="https://via.placeholder.com/40" alt="Profile" />
                {/* <span>Profile</span> */}
            </div>
        </div>
    )
}

export default Navigation;