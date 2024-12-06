// frontend/src/components/LoadingModal/LoadingModal.jsx

import './LoadingModal.css'; // Import the CSS file for styles

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-content">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
