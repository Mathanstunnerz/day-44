import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

export function Loginpage() {
  const navigate = useNavigate();
  const [invalid, setinvaild] = useState("");
  const formValidationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  });
  const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      // console.log(values)
      const login = await fetch("https://linkshortner.onrender.com/Login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" }
      });
      if (login.status === 400) {
        setinvaild("invalid credentials");
      } else {
        const check = await login.json();
        localStorage.setItem("usertoken", check.user_id);
        navigate('/Home');
      }
    }
  });
  return <div className='loginpage-container'>
    <form action="" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <span className='error'>{invalid === "invalid credentials" ? "invalid credentials" : null}</span>
      <input type="text" placeholder='Username' onBlur={handleBlur} onChange={handleChange} defaultValue={values.username} name='username' />
      <span>{handleBlur.username && errors.username ? errors.username : null}</span>
      <input type="text" placeholder='Password' onChange={handleChange} defaultValue={values.password} name='password' />
      <span>{handleBlur.password && errors.password ? errors.password : null}</span>
      <button type='submit'>Login</button>
      <div className='bottom-text'>
        <h4 onClick={() => navigate("/signup")}>Signup</h4>
        <h4 onClick={() => navigate("/forgetpassword")}>forget password</h4>
      </div>
    </form>
  </div>;
}
