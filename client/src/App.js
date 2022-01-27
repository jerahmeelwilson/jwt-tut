
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, NavLink } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginUser = () => setIsLoggedIn(!isLoggedIn);

  

  return (
    <div className="App">
      <NavLink to="/register">
          Register
      </NavLink>
      <NavLink to="/">
          Login
      </NavLink>
        <Routes>
          <Route path ="/" element={isLoggedIn ? <Dashboard /> : <Login logFunction={loginUser}/>}/>
          <Route path ="/register" element={<Register />}/>
        </Routes>
    </div>
  );
}

export default App;
