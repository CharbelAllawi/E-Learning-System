import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./styles.css"

import Modal from '../modal';
import Calendly from '../calendly';


const MyCard = ({ classInfo }) => {


    return (
        <div className="the-card">
            <div className='card-details'>
                <span className='card-title'>
                    {classInfo.title}
                </span>
                <span className='card-subtitle'>
                    {classInfo.description}
                </span>
                <span className='card-teacher'>
                    {classInfo.teacher_id}
                </span>
                {/* <button className='enrollbtn'>Enroll</button> */}
                <Calendly email={classInfo.meeting_url}/>

            </div>

            <div className='progress-container'>
                {/* <Modal></Modal> */}
                <div className='progress-details'>
                    <div className='CircularProgressbar-container'>
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
                    <div className='CircularProgressbar-container'>
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
                    <div className='CircularProgressbar-container'>
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
        </div>
    );
}

export default MyCard;
