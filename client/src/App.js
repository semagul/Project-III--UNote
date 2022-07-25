import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoteList from './pages/NoteList'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AudioList from './pages/AudioList'
import EventList from './pages/EventList'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute';
import EveryItem from './pages/EveryItem'
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/notes'
          element={
            <ProtectedRoute redirectTo="/login">
              <NoteList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/audios'
          element={
            <ProtectedRoute redirectTo="/login">
              <AudioList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/events'
          element={
            <ProtectedRoute redirectTo="/login">
              <EventList />
            </ProtectedRoute>
          }
        />
        <Route path='/allitems'
          element={
            <ProtectedRoute redirectTo="/login">
              <EveryItem />
            </ProtectedRoute>
          } />

        <Route path='/events/:id'
          element={
            <ProtectedRoute redirectTo="/login">
              <EventDetails />
            </ProtectedRoute>
          } />

        <Route path='/events/edit/:id'
          element={
            <ProtectedRoute redirectTo="/login">
              <EditEvent />
            </ProtectedRoute>
          } />

      </Routes>
    </div>
  );
}

export default App;
