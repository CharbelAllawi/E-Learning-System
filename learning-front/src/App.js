import './App.css';
import Quiz from './components/Quiz';
import MyCard from './components/courseCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Modal from './components/modal';
import LandingPage from './components/landing';
import NavBar from './components/navbar';
import HomePage from './pages/studentHome';
import { EnrollmentStateProvider } from './global/context';
import StudentCard from './components/studentCard';
import ParentHome from './pages/parentHome';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <EnrollmentStateProvider value={true}>
        <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/home' element={ 
              (localStorage.getItem('usertype') === 'Student') ? (<HomePage />): (<ParentHome/>) } />
          </Routes>
        </EnrollmentStateProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;