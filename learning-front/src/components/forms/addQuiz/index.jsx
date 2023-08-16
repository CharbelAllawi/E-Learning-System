import { useState } from "react";
import TextInput from "../../inputField/Index";
import "./styles.css"
import { sendRequest } from '../../../core/config/request';
const AddQuizForm = ({classInfo}) => {

    const [data, setData] = useState({
        description:"",
        on_date:"",
        questionText: "",
        answerText1:"",
        answerText2:"",
        answerText3:"",
        answerText4:"",
        correct:"",
    });

    const [questions, setQuestions] = useState([]);

    const handleAddClick = () => {
        const question = {
            questionText: data.questionText,
            answerOptions: [
                { answerText: data.answerText1, isCorrect: data.correct === "1" },
                { answerText: data.answerText2, isCorrect: data.correct === "2" },
                { answerText: data.answerText3, isCorrect: data.correct === "3" },
                { answerText: data.answerText4, isCorrect: data.correct === "4" }
            ]
        }
        setQuestions([...questions, question])
        setData({
            questionText: "",
            answerText1: "",
            answerText2: "",
            answerText3: "",
            answerText4: "", 
            description: data.description
        })
    }
    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmitClick = async () => {
        const axiosData = {
            description: data.description,
            content: JSON.stringify(questions),
            course_id: classInfo.id,
            on_date: data.on_date
        }
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/addquiz",
                body: axiosData,
            });
                if(response.message === "success"){
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
                    setData({
                        description:"",
                        on_date:"",
                        questionText: "",
                        answerText1:"",
                        answerText2:"",
                        answerText3:"",
                        answerText4:"",
                        correct:"",
                    })
                    setQuestions([])
                }
        } catch (error) {
            console.log(error);
    }}

    return ( 
        <div>
            <div className='add-quiz-form'>
            <TextInput
                name = {"description"}
                label={"Description:"}
                type={"text"}
                value={data.description}
                placeholder={"Enter the Description"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"on_date"}
                label={"On date:"}
                type={"date"}
                value={data.on_date}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"questionText"}
                label={"Question:"}
                type={"text"}
                value={data.questionText}
                placeholder={"Enter the question"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"answerText1"}
                label={"Answer 1:"}
                type={"text"}
                value={data.answerText1}
                placeholder={"Enter the first option"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"answerText2"}
                label={"Answer 2:"}
                type={"text"}
                value={data.answerText2}
                placeholder={"Enter the second option"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"answerText3"}
                label={"Answer 3:"}
                type={"text"}
                value={data.answerText3}
                placeholder={"Enter the third option"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"answerText4"}
                label={"Answer 4:"}
                type={"text"}
                value={data.answerText4}
                placeholder={"Enter the fourth option"}
                onChange={handleDataChange}
            />
            <div className="quiz-form-btns">
                <select name= {"correct"} value={data.correct} onChange={handleDataChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                <button className='teacher-option-btn submit' onClick={handleAddClick}>Add</button>
                <button className='teacher-option-btn submit' onClick={handleSubmitClick}>Submit</button>
            </div>
            
        </div>
        </div>
    );
}

export default AddQuizForm;