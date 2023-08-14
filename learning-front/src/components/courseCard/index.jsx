import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./styles.css"

import Modal from '../modal';
import Calendly from '../calendly';
import { useState } from 'react';


const MyCard = ({ classInfo }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setmodalData] = useState('');
    const [modalChoice, setmodalChoice] = useState('');
    function openModal(data, type) {
        if (type == "Sessions") {
            setIsModalOpen(true);
            setmodalData(data);
            setmodalChoice("Session");
        }
        if (type == "Assignments") {
            const Assignments = Object.values(data.student_materials).filter(item => item.title.startsWith('Assignment'));
            setIsModalOpen(true);
            setmodalData(Assignments);
            setmodalChoice("Assignment");

        }
        if (type == "Quizzes") {
            const Quizzes = Object.values(data.student_materials).filter(item => item.title.startsWith('Quiz'));
            setIsModalOpen(true);
            setmodalData(Quizzes);
            setmodalChoice("Quiz");
        }
    }

    function closeModal() {
        setIsModalOpen(false);
        setmodalData('');
    }

    return (
        <>
            {isModalOpen && (
                <Modal choice={modalChoice} data={modalData} isOpen={isModalOpen} onClose={closeModal} />
            )}
            <div className="the-card">
                <div className='card-details'>
                    <span className='card-title'>
                        {classInfo.title}
                    </span>
                    <span className='card-subtitle'>
                        {classInfo.description}
                    </span>

                    <span className='card-teacher'>
                        {classInfo.teacher_name}
                    </span>
                    <div className='course-card-button-div'>
                        {
                            classInfo.isEnrolled ?
                                <Calendly email={classInfo.meeting_url} />
                                : <button className='enrollbtn'>Enroll</button>
                        }
                    </div>
                </div >
                {
                    classInfo.isEnrolled ?
                        <div className='progress-container'>
                            <div className='progress-details'>
                                <div className='CircularProgressbar-container' onClick={() => openModal(classInfo, "Sessions")}>
                                    <CircularProgressbar
                                        value={(5 / classInfo.number_of_sessions) * 100}
                                        text={`${Math.ceil((5 / classInfo.number_of_sessions) * 100)}%`}
                                        styles={buildStyles({
                                            textSize: '1.5rem',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `rgba(62, 152, 199, ${((5 / classInfo.number_of_sessions) * 100) / 100})`,
                                            textColor: 'rgb(62, 152, 199)',
                                            backgroundColor: 'rgb(117, 117, 117)',
                                        })}
                                    />
                                    <span>Sessions</span>
                                </div>
                                <div className='CircularProgressbar-container' onClick={() => openModal(classInfo, "Assignments")}>
                                    <CircularProgressbar
                                        value={(5 / classInfo.number_of_assignments) * 100}
                                        text={`${Math.ceil((5 / classInfo.number_of_assignments) * 100)}%`}
                                        styles={buildStyles({
                                            textSize: '1.5rem',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `rgba(34, 150, 50, ${(5 / classInfo.number_of_assignments) * 100})`,
                                            textColor: 'rgb(34, 150, 50)',
                                            backgroundColor: 'rgb(117, 117, 117)',
                                        })}
                                    />
                                    <span>Assignments</span>
                                </div>
                                <div className='CircularProgressbar-container' onClick={() => openModal(classInfo, "Quizzes")}>
                                    <CircularProgressbar
                                        value={(2 / classInfo.number_of_quizzes) * 100}
                                        text={`${Math.ceil((2 / classInfo.number_of_quizzes) * 100)}%`}
                                        styles={buildStyles({
                                            textSize: '1.5rem',
                                            pathTransitionDuration: 0.5,
                                            pathColor: `rgba(230, 50, 50, ${(2 / classInfo.number_of_quizzes) * 100})`,
                                            textColor: 'rgb(230, 50, 50)',
                                            backgroundColor: 'rgb(117, 117, 117)',
                                        })}
                                    />
                                    <span>Quizzes</span>
                                </div>
                            </div>

                        </div>
                        : ""}

            </div >
        </>
    );
}

export default MyCard;
