import logo from '../../ELearning.svg'
import { useState, useEffect } from "react"
import "./styles.css"
import { useEnrollmentState } from '../../global/context'
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../../core/config/request'

const NavBar = () => {

    const navigate = useNavigate()
    const { isEnrolled, setIsEnrolled } = useEnrollmentState();
    const [showButtons, setShowButtons] = useState(true);
    const [showLogout, setShowLogout] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname == "/"){
            setShowButtons(false);
            setShowLogout(false)
        }
        if (location.pathname == "/" || (localStorage.getItem('usertype') != 4)) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
            setShowLogout(true)
        }
    }, [location.pathname]);

    const logoutHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/logout",
            });
            if(response.message === "Successfully logged out"){
                localStorage.clear()
                navigate('/')
                window.location.reload(false)
                } 
        } catch (error) {
            console.log(error);
        }}

    return ( 
        <div className='navbar'>
            <img src={logo} className="App-logo" alt="logo" />
            <div className='navbar-btns-div'>
            {showButtons && (
                <>
                <button className={isEnrolled ? "navbar-btn active" : "navbar-btn"} onClick={()=> setIsEnrolled(true)}>Enrolled</button>
                <button className={isEnrolled ? "navbar-btn" : "navbar-btn active"} onClick={()=> setIsEnrolled(false)}>Browse</button>
                </>
            )}
            {showLogout &&<button className={"navbar-btn"} onClick={logoutHandler}>Logout</button>}
            </div>
        </div>
    );
}

export default NavBar;