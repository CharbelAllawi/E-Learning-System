import TextInput from '../../inputField/Index';
import './styles.css'
import { useState } from 'react';
import { sendRequest } from '../../../core/config/request';

const AddAssignmentForm = ({classInfo}) => {

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, course_id: classInfo.id });
    };

    const [data, setData] = useState({
            description:"",
            due_date:"",
            course_id: ""
        });

    const postAssignmentHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/addassignment",
                body: data,
            });
            if(response.message === "success"){
                setData({
                    description:"",
                    due_date:"",
                    course_id: classInfo.id
                })
                try {
                    const email_data = new FormData();
                    email_data.append('course_id', classInfo.id)
                    email_data.append('description', data.description)
                    await sendRequest({
                        method: "POST",
                        route: "/api/send-email",
                        body: email_data,
                    });
                } catch (error) {
                    console.log(error);
            }
            }
        } catch (error) {
            console.log(error);
    }}
    
    return ( 
        <div className='add-assignment-form'>
            <TextInput
                name = {"description"}
                label={"Assignment Description:"}
                type={"text"}
                value={data.description}
                placeholder={"Enter assignment Description"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"due_date"}
                label={"Assignment Due Date:"}
                type={"date"}
                value={data.due_date}
                placeholder={"Enter assignment Due Date"}
                onChange={handleDataChange}
            />
            <button className='teacher-option-btn submit' onClick={postAssignmentHandler}>Submit</button>
        </div>
    );
}

export default AddAssignmentForm;