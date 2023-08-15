import { useState } from "react";
import "./styles.css"

const SubmissionCard = () => {

    const [data, setData] = useState({
        grade:"",
        feedback:"",
        course_id: 1,
        student_id: 1,
        assignment_id: 1
    });

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return ( 
        <div className="submission-card-div">
            <div className="submission-card-left">
                <span>student name</span>
                <span>title</span>
            </div>
            
            <div className="submission-card-right">
                <button 
                    className="teacher-option-btn grade-card-btn"
                >Download</button>
                <input 
                    name="grade"
                    className="grade-input" 
                    type="text" 
                    placeholder="Enter grade"
                    value={data.grade}
                    onChange={handleDataChange}
                ></input>
                <input 
                    name="feedback"
                    type="text" 
                    placeholder="Feedback"
                    value={data.feedback}
                    onChange={handleDataChange}
                ></input>
                <button 
                    className="teacher-option-btn grade-card-btn"
                >Done</button>
            </div>
        </div>
     );
}
 
export default SubmissionCard;