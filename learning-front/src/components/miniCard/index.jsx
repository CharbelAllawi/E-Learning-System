import React, { useState } from 'react';
import './style.css';
import Quiz from '../Quiz';
import uploadpng from "./upload.png"
import { sendRequest } from '../../core/config/request';

const MiniCard = ({ data, choice }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };
  const handleFileChange = async (event, material_id) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('material_id', material_id);
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/api/postassignment",
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {choice === "Assignment" && data.map(item => (
        <div className="card" key={item.id}>
          <ul>
            <li className="User">
              <span className="alltitle">{item.title}</span>
              <span className='alldesc'>
                <span className='alldescription'>{item.description}</span>
              </span>
              <div className='uploadcontainer'>
                <div className='upload'>
                  <p className='submittxt'>Submit your answer!</p>
                  <label className='uploadbtn'>
                    <input
                      type='file'
                      style={{ display: 'none' }}
                      onChange={(event) => handleFileChange(event, item.id)}
                    />
                    <img src={uploadpng} alt="Upload Icon" />
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ))}

      <div className="card">
        {choice === "Quiz" && (
          <ul>
            {data.map(quiz => (
              <li key={quiz.id} className="User">
                <span className="alltitle">{quiz.title}</span>
                <span className='alldesc'>
                  <span className='alldescription'>{quiz.description}</span>
                </span>
                {!showQuiz ? (
                  <button className="btn" onClick={handleQuizButtonClick}>Take Quiz</button>
                ) : (
                  <Quiz />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

    </>
  );
};

export default MiniCard;
