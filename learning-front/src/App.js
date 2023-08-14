import './App.css';
import Quiz from './components/Quiz';
import MyCard from './components/courseCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Modal from './components/modal';
import LandingPage from './components/landing';
import NavBar from './components/navbar';
import HomePage from './pages/home';
import { EnrollmentStateProvider } from './global/context';
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <EnrollmentStateProvider value={true}>
        <NavBar />
          <Routes>
            <Route path='/home' element={ <HomePage /> } />
            <Route path='landing' element={<LandingPage />}></Route>
          </Routes>
        </EnrollmentStateProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;