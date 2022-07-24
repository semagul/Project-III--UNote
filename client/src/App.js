import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AudioList from './pages/AudioList'

function App() {
  return (
    <Routes>
      <Route path='/notes' element={<NoteList />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/audios' element={<AudioList />} />
    </Routes>

  );
}

export default App;
