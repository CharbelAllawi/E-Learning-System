import React, { useState } from 'react';
import './style.css';
import Quiz from '../Quiz';

const MiniCard = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  return (
    <div className="card">
      <ul>
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
      </ul>
    </div>
  );
};

export default MiniCard;
