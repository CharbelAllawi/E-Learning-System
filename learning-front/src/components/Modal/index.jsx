import React, { useState } from 'react';
import './style.css';
import MiniCard from '../miniCard';

const Modal = ({ isOpen = true }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <div className='h1div'>
              <h1>Quizzes Details</h1>
            </div>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
