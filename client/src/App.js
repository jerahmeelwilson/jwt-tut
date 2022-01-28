
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Dashboard from './components/Dashboard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div className="App">
       <NavLink to="/">
          Home
      </NavLink>
      <NavLink to="/register">
          Register
      </NavLink>
      <ToastContainer />
        <Routes>
          <Route path ="/" element={isLoggedIn ? <Dashboard setLogin= {setIsLoggedIn}/> : <Login setLogin={setIsLoggedIn}/>}/>
          <Route path ="/register" element={<Register setLogin= {setIsLoggedIn}/>}/>
        </Routes>
    </div>
  );
}

export default App;
