import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './page/Chat';
import Login from './page/Login';
import Signup from './page/Signup';
import Headers from './components/Headers';
import { selectUser, setUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  console.log(user)


  return (
    <Router>
      <Headers />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/chat' element={<Chat />} /> */}
        <Route path='/chat' element={user ? <Chat /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
