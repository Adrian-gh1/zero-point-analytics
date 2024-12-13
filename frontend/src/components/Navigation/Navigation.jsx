// frontend/src/components/Navigation/Navigation.jsx

import { useNavigate, Link } from 'react-router-dom';
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

            <div className="left-navbar" onClick={logoHandler}>
                <FaBuilding /> Zero Point
            </div>

            <div className="search-bar">
                {/* <input type="text" placeholder="Search..." /> */}
            </div>

            <div className="right-navbar">
                <Link to='/'>Home</Link>
                {/* <Link to='/businessDirectory'>Businesses</Link> */}
                <Link to='/serviceDirectory'>Services</Link>
                {/* <Link to='/'>Marketing</Link> */}
                {/* <Link to='/'>Home</Link> */}

                <div className='right-navbar-pofile-menu'>
                    <ProfileMenu/>
                </div>

            </div>
            
        </div>
    )
}

export default Navigation;