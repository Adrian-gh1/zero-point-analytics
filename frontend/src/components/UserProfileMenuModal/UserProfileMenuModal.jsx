// frontend/src/components/UserProfileMenuModal/UserProfileMenuModal.jsx

import { useDispatch, useSelector } from 'react-redux';
import './UserProfileMenuModal.css'

function UserProfileMenuModal({ show, onClose }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>User Profile</h2>
                <p>Here is the profile menu</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default UserProfileMenuModal;