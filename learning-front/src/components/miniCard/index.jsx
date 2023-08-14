import React, { useState, useEffect } from 'react';
import './style.css';
import Quiz from '../Quiz';
import uploadpng from './upload.png';
import { sendRequest } from '../../core/config/request';

const MiniCard = ({ data, choice }) => {
  const [showQuiz, setShowQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const handleQuizButtonClick = async (quizId) => {
    try {
      const formData = new FormData();
      formData.append('quiz_id', quizId);
      const response = await sendRequest({
        route: '/api/get_questions',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setQuestions(eval(response.questions));
      setShowQuiz((prevState) => ({
        ...prevState,
        [quizId]: true,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (event, material_id) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('material_id', material_id);
    try {
      await sendRequest({
        method: 'POST',
        route: '/api/postassignment',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  function genlink() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  useEffect(() => {
    const getAttendance = async () => {
      try {
        const response = await sendRequest({
          method: 'GET',
          route: '/api/getattendance',
        });
        setAttendance(response.attendance);
      } catch (error) {
        console.log(error);
      }
    };
    getAttendance();
  }, []);

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
                  
                  {localStorage.getItem('usertype') === 'Student'? 
                  <>
                  <p className='submittxt'>Submit your answer!</p>
                  <label className='uploadbtn'>
                    <input
                      type='file'
                      style={{ display: 'none' }}
                      onChange={(event) => handleFileChange(event, item.id)}
                    />
                    <img src={uploadpng} alt="Upload Icon" />
                  </label> </>: item.grade? <p className='submittext'>Grade: {item.grade} </p> : <p className='submittext'> Not done yet.</p>}
                </div>
              </li>
            </ul>
          </div>
        ))}

      <div className="card">
        {choice === 'Quiz' && (
          <ul>
            {data.map((quiz) => (
              <li key={quiz.quiz_id} className="User">
                <span className="alltitle">{quiz.title}</span>
                <span className="alldesc">
                  <span className="alldescription">{quiz.description}</span>
                </span>
                
                {!showQuiz[quiz.quiz_id] ? (
                  localStorage.getItem('usertype') === "Student" ?
                  <button className="btn" id={quiz.quiz_id} onClick={() => handleQuizButtonClick(quiz.quiz_id)}>Take Quiz</button>:
                  quiz.grade? <p className='submittext'>Grade: {quiz.grade} </p> : <p className='submittext'> Not taken yet.</p>
                ) : (
                  <Quiz key={quiz.quiz_id} quizData={questions} quizId={quiz.quiz_id} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {choice === 'Session' &&
        attendance.map((attend) => {
          console.log(data)
          if (attend.course_id === data.id) {
            return (
              <div className="card" key={data.id}>
                <ul>
                  <li className="User">
                    <br></br>
                    <span className="classtitle">Session URL: <a className='glink' href={genlink()}>https://meet.google.com/{genlink()}</a></span>
                    <br></br>
                    <span className="alldesc">
                      <span className="alldescription" key={attend.id}>
                        <span>Session ID: {attend.session_id}</span>
                        <br />
                        <br />
                        <span>
                          Attendance: {attend.is_present === 0 ? 'Did Not Attend' : 'Attended'}
                        </span>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            );
          }
          return null;
        })}
    </>
  );
};

export default MiniCard;
