import {useEffect, useState} from 'react'
import StudentCard from '../../components/studentCard';
import { sendRequest } from '../../core/config/request';
import './styles.css'
const ParentHome = () => {

    const [children, setChildren] = useState([])

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
                    <StudentCard key={child} childName={child}/>)) 
                }
            </div>
            <div>
                
            </div>
        </div>
        </>
     );
}
 
export default ParentHome;