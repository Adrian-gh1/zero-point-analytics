// frontend/src/components/ProfileMenu/ProfileMenu.jsx

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { thunkLogout } from '../../redux/session';
import './ProfileMenu.css';

function ProfileMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);         

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef(null);

    const handleNavigate = (path) => {
        navigate(path);
        toggleMenu(false);
    };

    const handleLogout = () => {
        dispatch(thunkLogout());
        navigate('/');
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <div>
            <button onClick={toggleMenu}>
                <FaUser size={20} />
            </button>

            {isMenuOpen && (
                <div className="dropdown-menu" ref={profileRef}>
                    <ul>
                        {!sessionUser?.id ? (
                            <>
                                <li onClick={() => handleNavigate("/login")}>Log In</li>
                                <li onClick={() => handleNavigate("/signup")}>Sign Up</li>
                            </>
                        ) : (
                            <>
                                <li>{sessionUser.firstName} {sessionUser.lastName}</li>
                                <li>{sessionUser.role} at [Company Name]</li>
                                <li onClick={() => handleNavigate("/profile")}>Profile</li>
                                <li onClick={() => handleNavigate("/settings")}>Settings</li>
                                <li onClick={handleLogout}>Logout</li>
                            </>
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
}

export default ProfileMenu;