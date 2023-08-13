import React from 'react';
import './style.css';
import MiniCard from '../miniCard';

const Modal = ({ choice, data, isOpen, onClose }) => {
  const modalContent = {
    Quiz: {
      title: 'Quizzes Details',
    },
    Assignment: {
      title: 'Assignment Details',
    },
    Session: {
      title: 'Session Details',
    },
  };

  const content = modalContent[choice];

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <div className="h1div">
                <h1>{content.title}</h1>
              </div>
              <MiniCard data={data} choice={choice} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
