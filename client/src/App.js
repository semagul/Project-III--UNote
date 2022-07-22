import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'

function App() {
  return (
    <Routes>
      <Route path='/notes' element={<NoteList />} />
    </Routes>

  );
}

export default App;
