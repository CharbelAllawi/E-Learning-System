import './App.css';
import MyCard from './components/courseCard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'import LandingPage from './components/landing';

function App() {
  const response = {
    "items": [
      {
        "name": "Mathematics",
        "description": "Advanced math course for high school students",
        "teacher_name": "John Smith",
        "number_of_assignments": 15,
        "number_of_quizzes": 8,
        "number_of_sessions": 30
      },
      {
        "name": "English Literature",
        "description": "Exploring classic literature and critical analysis",
        "teacher_name": "Alice Johnson",
        "number_of_assignments": 12,
        "number_of_quizzes": 6,
        "number_of_sessions": 25
      },
      {
        "name": "Science Lab",
        "description": "Hands-on experiments in various scientific disciplines",
        "teacher_name": "Robert Brown",
        "number_of_assignments": 18,
        "number_of_quizzes": 5,
        "number_of_sessions": 28
      },
      {
        "name": "History Unveiled",
        "description": "Unraveling the mysteries of the past",
        "teacher_name": "Emily Adams",
        "number_of_assignments": 10,
        "number_of_quizzes": 4,
        "number_of_sessions": 22
      },
      {
        "name": "Art Appreciation",
        "description": "Exploring the world of visual arts and creativity",
        "teacher_name": "Michael Carter",
        "number_of_assignments": 8,
        "number_of_quizzes": 3,
        "number_of_sessions": 20
      },
      {
        "name": "Physical Education",
        "description": "Staying active and healthy through sports and activities",
        "teacher_name": "Sarah Thompson",
        "number_of_assignments": 5,
        "number_of_quizzes": 2,
        "number_of_sessions": 15
      },
      {
        "name": "Computer Programming",
        "description": "Learning to code and develop software applications",
        "teacher_name": "David Miller",
        "number_of_assignments": 20,
        "number_of_quizzes": 10,
        "number_of_sessions": 35
      },
      {
        "name": "Music Theory",
        "description": "Understanding the elements and structure of music",
        "teacher_name": "Jennifer White",
        "number_of_assignments": 14,
        "number_of_quizzes": 7,
        "number_of_sessions": 26
      },
      {
        "name": "Foreign Languages",
        "description": "Exploring new languages and cultures",
        "teacher_name": "Luis Hernandez",
        "number_of_assignments": 16,
        "number_of_quizzes": 9,
        "number_of_sessions": 29
      },
      {
        "name": "Environmental Studies",
        "description": "Examining environmental issues and sustainability",
        "teacher_name": "Karen Green",
        "number_of_assignments": 11,
        "number_of_quizzes": 4,
        "number_of_sessions": 24
      },
      {
        "name": "Environmental Studies",
        "description": "Examining environmental issues and sustainability",
        "teacher_name": "Karen Green",
        "number_of_assignments": 11,
        "number_of_quizzes": 4,
        "number_of_sessions": 24
      },
      {
        "name": "Chemistry Basics",
        "description": "Introduction to chemical principles and reactions",
        "teacher_name": "Alex Turner",
        "number_of_assignments": 9,
        "number_of_quizzes": 3,
        "number_of_sessions": 18
      },
      {
        "name": "Creative Writing",
        "description": "Expressing thoughts and stories through writing",
        "teacher_name": "Sophia Lee",
        "number_of_assignments": 13,
        "number_of_quizzes": 5,
        "number_of_sessions": 27
      }
    ]
  }
  const classes = response.items

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div className="cards-container">
            {classes.map(classInfo => (
              <MyCard key={classInfo.name} classInfo={classInfo} />
            ))}
          </div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
