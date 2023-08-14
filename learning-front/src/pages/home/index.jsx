import { useState, useEffect } from "react";
import { sendRequest } from "../../core/config/request";
import MyCard from "../../components/courseCard";
import { useEnrollmentState } from "../../global/context";


const HomePage = () => {

    const [courses, setCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [notEnrolledCourses, setNotEnrolledCourses] = useState([]);
    const { isEnrolled } = useEnrollmentState(false);

    useEffect(() => {
        const getCoursesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/get_courses",
                });
                setCourses(response.courses)
            } catch (error) {
                console.log(error);
            }
        };
        getCoursesHandler()
    }, [])

    useEffect(() => {
        const enrolled_courses = courses.filter(course => course.isEnrolled);
        const notEnrolled_courses = courses.filter(course => !course.isEnrolled);
    
        setEnrolledCourses(enrolled_courses);
        setNotEnrolledCourses(notEnrolled_courses);
    }, [courses]);

    return (
        <>
        <div className="cards-container">
        {isEnrolled? enrolledCourses.map(classInfo => (
                <MyCard key={classInfo.id} classInfo={classInfo} isEnrolled={classInfo.isEnrolled}/>)) 
                : notEnrolledCourses.map(classInfo => (
                <MyCard key={classInfo.id} classInfo={classInfo} isEnrolled={classInfo.isEnrolled}/>))
        }
        </div>
        </>
    );
}

export default HomePage;