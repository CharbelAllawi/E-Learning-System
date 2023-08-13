import React, { useState } from 'react';
import './style.css';
import Quiz from '../Quiz';
import uploadpng from "./upload.png"

import { sendRequest } from '../../core/config/request';
const MiniCard = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignment_id', 1); // Change to the appropriate assignment ID

    try {
      const response = await sendRequest({
        method: "POST",
        route: "/api/postassignment",
        body: formData, // Send the FormData object
        headers: {
          
          'Content-Type': 'multipart/form-data', // Set proper content type for file upload
      },
      });
  } catch (error) {
    console.log(error)
  }
}
return (
  <div className="card">
    <ul>
      <li className="User">
        <span className="quizTitle">E-learning System</span>
        <span className='quizdesc'>
          <span className='quizDescription'>I'm the jazzar and you have a nightmare assignment for today! </span>
        </span>
        <div className='uploadcontainer'>
          <div className='upload'>
            <p className='submittxt'>Submit your answer!</p>
            <label className='uploadbtn'>
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img src={uploadpng} alt="Upload Icon" />
            </label>
          </div>
        </div>
      </li>
    </ul>
    {/* Quiz section */}
    {/* <ul>
        <li className="User">
          <span className="quizTitle">Quiz: React Hooks</span>
          <span className='quizdesc'>
            <span className='quizDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit...</span>
          </span>
          {!showQuiz ? (
            <button className="btn" onClick={handleQuizButtonClick}>Take Quiz</button>
          ) : (
            <Quiz />
          )}
        </li>
      </ul> */}
  </div>
);
};

export default MiniCard;
