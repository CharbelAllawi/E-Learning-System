import AddCourse from "../../components/forms/addCourse";
import SideBarCard from "../../components/studentCard";

import "./styles.css"

const AdminPage = () => {
    return ( 
        <div>
            <>
            <div className='admin-home-body'>
                <div className='admin-course-cards-container'>
                
                <SideBarCard key={234234} name={'course'} /> 
                
                </div>
                <div className='admin-right-panel'>
                    <AddCourse/>
                </div>
            </div>
        </>
        </div>
    );
}

export default AdminPage;