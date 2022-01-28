import React from 'react';
import {useFormik} from 'formik'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({setLogin}) {
  const initialValues = {
    email: "",
    password: ""
  }
  const onSubmit = async (values) => {
    axios.post('http://localhost:4001/auth/login', values)
    .then((res) => {
      if(res.data.token){
        localStorage.setItem("token", res.data.token);
        setLogin(true);
        toast.success("Login Successfull");
      } else{
        toast.error(res.data);
      }
    }).catch((err) => {
      toast.error(err.response.data);
    })


  }
  const validate = (values) => {
    const errors = {}
    if(!values.email) {
      errors.email = "Email Required"
    }
    if(!values.password) {
      errors.password = "Password Required"
    } else if(values.password.length < 8) {
      errors.password = "Password must be longer than 8 Characters."
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })


  return <div>
    <h2>Login Page</h2>
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder='Email'
         />
      <input
        type="password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder='Password'
         />
         <button type='submit' disabled={!formik.isValid}>Submit</button>
    </form>
  </div>;
}

export default Login;
