import { useState } from "react";
import "./styles.css"
import { sendRequest } from "../../core/config/request";

const SubmissionCard = ({info, assignmentInfo}) => {

    const [data, setData] = useState({
        grade:"",
        feedback: assignmentInfo.feedback ? assignmentInfo.feedback : '',
        student_id: assignmentInfo.student_id,
        assignment_id: assignmentInfo.assignment ? assignmentInfo.assignment.id : null,
    }); 

    const [doneButtonDisabled, setDoneButtonDisabled] = useState(false)
    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value,
                        student_id: assignmentInfo.student_id,
                        assignment_id: assignmentInfo.assignment ? assignmentInfo.assignment.id : null })
    }

    const handleGrading = async () => {setDoneButtonDisabled(true)
        if(data.grade && data.feedback){
            console.log(data)
            try {
                const response = await sendRequest({
                    method: "POST",
                    route: "/api/resultassignment",
                    includeHeaders: false,
                    body: data,
                });
                if(response.message === "success"){
                    setDoneButtonDisabled(true)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return ( 
        <div className="submission-card-div">
            <div className="submission-card-left">
                <span>{assignmentInfo.student_id}</span>
                <span>{assignmentInfo.description}</span>
            </div>
            
            <div className="submission-card-right">
                {assignmentInfo.assignment?
                <a 
                    className="teacher-option-btn grade-card-btn"
                    href={`http://localhost:8000/storage/submissions/${assignmentInfo.assignment.submission_path}`}
                    download = {`${assignmentInfo.assignment.submission_path}`}
                    target="_blank"
                >Download</a>:<span>Yet to submit</span>}
                {assignmentInfo.grade? `Grade: ${assignmentInfo.grade}` : <input 
                    name="grade"
                    className="grade-input" 
                    type="text" 
                    placeholder={"Enter grade"}
                    value={data.grade}
                    onChange={handleDataChange}
                ></input>}
                {assignmentInfo.feedback ? '' : <input 
                    name="feedback"
                    type="text" 
                    placeholder="Feedback"
                    value={data.feedback}
                    onChange={handleDataChange}
                ></input>}
                { !(assignmentInfo.feedback && assignmentInfo.grade ) && data.assignment_id ? 
                <button 
                    disabled={doneButtonDisabled}
                    onClick={handleGrading}
                    className="teacher-option-btn grade-card-btn"
                >Done</button>:''}
            </div>
        </div>
     );
}
 
export default SubmissionCard;