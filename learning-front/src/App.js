import './App.css';
import Quiz from './components/Quiz';
import MyCard from './components/courseCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Modal from './components/modal';
import LandingPage from './components/landing';
import NavBar from './components/navbar';
import ParentHome from './pages/parentHome/index';
import HomePage from './pages/studentHome/index.jsx';
import { EnrollmentStateProvider } from './global/context';
import StudentCard from './components/studentCard';
import TeacherHome from './pages/teacherHome';
import AdminPage from './pages/adminHome';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <EnrollmentStateProvider value={true}>
        <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/home' element={ 
              (localStorage.getItem('usertype') == 4) ? (<HomePage />): (<ParentHome/>) } />
            <Route path='/teacher' element={<TeacherHome/>}/>
            <Route path='/admin' element={<AdminPage/>}/>
          </Routes>
        </EnrollmentStateProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;