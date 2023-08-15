
import "./styles.css";
import { useState } from 'react';
import { sendRequest } from '../../../core/config/request';
import TextInput from '../../inputField/Index';
const AddCourse = () => {
    
    const [data, setData] = useState({
        title: "",
        description : "",
        email : "",
        enrollment_limit : "", 
        number_of_assignments : "", 
        number_of_sessions : "", 
        number_of_quizzes : "", 
        meeting_url : "", 
        start_at : "", 
        end_at : "", 
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const addCourseHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/addOrUpdateCourse",
                body: data,
            });
            if(response.result === "success"){
                setData({
                    title: "",
                    description : "",
                    email : "",
                    enrollment_limit : "", 
                    number_of_assignments : "", 
                    number_of_sessions : "", 
                    number_of_quizzes : "", 
                    meeting_url : "", 
                    start_at : "", 
                    end_at : "", 
            })
            }
        } catch (error) {
            console.log(error);
        }}
    

    
    return (
        <div className='add-course-container'>
            <div className='form'>
                <div className="add-course-container-title">
                    <h1>Add Course</h1>
                </div>
                <TextInput
                    name = {"title"}
                    label={"Title:"}
                    type={"text"}
                    value={data.title}
                    placeholder={"Enter the course title"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"description"}
                    label={"Description:"}
                    type={"text"}
                    value={data.description}
                    placeholder={"Enter the course description"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"email"}
                    label={"Teacher E-mail:"}
                    type={"text"}
                    value={data.email}
                    placeholder={"Enter the teacher's e-mail"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"enrollment_limit"}
                    label={"Enrollment Limit:"}
                    type={"text"}
                    value={data.enrollment_limit}
                    placeholder={"Enter the enrollment limit"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"number_of_assignments"}
                    label={"Number Of Assignments:"}
                    type={"text"}
                    value={data.number_of_assignments}
                    placeholder={"Enter the number of assignments"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"number_of_quizzes"}
                    label={"Number Of Quizzes:"}
                    type={"text"}
                    value={data.number_of_quizzes}
                    placeholder={"Enter the number of quizzes"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"number_of_sessions"}
                    label={"Number Of Sessions:"}
                    type={"text"}
                    value={data.number_of_sessions}
                    placeholder={"Enter the number of sessions"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"meeting_url"}
                    label={"Meeting url:"}
                    type={"text"}
                    value={data.meeting_url}
                    placeholder={"Enter the meeting url"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"start_at"}
                    label={"Starting Date:"}
                    type={"date"}
                    value={data.starts_at}
                    placeholder={"Enter the starting date"}
                    onChange={handleDataChange}
                />
                <TextInput
                    name = {"end_at"}
                    label={"Ending Date:"}
                    type={"date"}
                    value={data.ends_at}
                    placeholder={"Enter the ending date"}
                    onChange={handleDataChange}
                />

                <div className="signin-btn-container">
                    <button
                        type="button"
                        className="signin-btn"
                        id="signin-btn"
                        onClick={addCourseHandler}
                    >Add course</button>
                </div>
            </div>
        </div>
    );
}

export default AddCourse;