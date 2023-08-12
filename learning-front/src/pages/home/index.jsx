import { useState, useEffect } from "react";
import { sendRequest } from "../../core/config/request";
import MyCard from "../../components/courseCard";



const HomePage = () => {

    const [courses, setCourses] = useState([])

const getCoursesHandler = async () => {
    try {
        const response = await sendRequest({
            route: "/get_courses",
        });
        setCourses(response.status)
    } catch (error) {
        console.log(error);
        setError(error.message);
    }
};

    return (
        <>
        <div>
            <button onClick={getCoursesHandler}>get courses</button>
        </div>
        <div className="cards-container">
        {courses.map(classInfo => (
                <MyCard key={classInfo.id} classInfo={classInfo} />
            ))}
        </div>
        </>
    );
}

export default HomePage;