import React, { useState, useEffect } from 'react';
import './style.css';
import MiniCard from '../miniCard';


const Modal = ({ isOpen = true, onClose, children }) => {



  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <div className='h1div'>
              <h1>Quizzes Details
              </h1>
            </div>
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />

          </div>
        </div>
      )
      }
    </div >
  );
};

export default Modal;
