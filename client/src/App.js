import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'
import Signup from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path='/notes' element={<NoteList />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>

  );
}

export default App;
