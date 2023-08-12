import React, { useState } from 'react';
import './style.css';
import Quiz from '../Quiz';
import uploadpng from "./upload.png"
const MiniCard = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };
  const upload = () => {

  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
  };
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
      {/* <ul>
        <li className="User">
          <span className="quizTitle">Quiz: React Hooks</span>
          <span className='quizdesc'>
            <span className='quizDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi numquam aspernatur dolorum rerum distinctio aperiam voluptate accusantium. Magnam maiores labore voluptatum architecto, dolor obcaecati error eligendi quam exercitationem, nisi reprehenderit!</span>
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
