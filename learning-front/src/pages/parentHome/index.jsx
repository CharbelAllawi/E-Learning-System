import {useEffect, useState} from 'react'
import StudentCard from '../../components/studentCard';
import { sendRequest } from '../../core/config/request';
import './styles.css'
import MyCard from '../../components/courseCard';
const ParentHome = () => {

    const [children, setChildren] = useState([])
    const [childCourses, setChildCourses] = useState([])

    const getChildCourses = async (child) => {
        console.log(0)
        try {
            const response = await sendRequest({
                method: "GET",
                route: `/api/get_courses/${child}`,
            });
            console.log(1)
            setChildCourses(response.courses)
        } catch (error) {
            console.log(error);
        }
        console.log(2)
    };
    

    useEffect(() => {
        const getChildrenHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/get_children/",
                });
                setChildren(response.children)
            } catch (error) {
                console.log(error);
            }
        };
        getChildrenHandler()
    }, [])
    return ( 
        <>
        <div className='parents-home-body'>
            <div className='student-cards-container'>
                {children.map(child => (
                    <StudentCard key={child} childName={child} onCall={() => getChildCourses(child)}/>)) 
                }
            </div>
            <div className='Child-courses-contained'>
                {
                    (
                        childCourses.length > 0 ?
                        childCourses.map(classInfo => (
                            <MyCard key={classInfo.id} classInfo={classInfo} isEnrolled={classInfo.isEnrolled}/>))
                            : <span className='empty-child-course-container'>No Courses Found</span>
                    )
                }
            </div>
        </div>
        </>
     );
}
 
export default ParentHome;