import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AudioList from './pages/AudioList'
import EventList from './pages/EventList'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/notes' element={<NoteList />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/audios' element={<AudioList />} />
        <Route path='/events' element={<EventList />} />
      </Routes>
    </div>
  );
}

export default App;
