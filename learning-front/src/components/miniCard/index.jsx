import React from 'react';
import './style.css';

const MiniCard = () => {
  return (
    <div className="card">
      <ul>
        <li className="User">
          <span className="quizTitle">Quiz: React Hooks</span>
          <span className='quizdesc'>
            <span className='quizDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi numquam aspernatur dolorum rerum distinctio aperiam voluptate accusantium. Magnam maiores labore voluptatum architecto, dolor obcaecati error eligendi quam exercitationem, nisi reprehenderit!</span>
          </span>
          <button className="btn">Take Quiz</button>
        </li>
      </ul>
    </div>
  );
};

export default MiniCard;
