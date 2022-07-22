import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path='/notes' element={<NoteList />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>

  );
}

export default App;
