import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

export function Signpage() {
  const navigate = useNavigate();
  const [invalid, setinvaild] = useState("");
  const formValidationSchema = yup.object({
    username: yup.string().max(25).min(5).required(),
    password: yup.string().min(6).max(15).required(),
    email: yup.string().email().required(),
  });
  const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
    initialValues: { username: '', password: '', email: "" },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch("https://linkshortner.onrender.com/Signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" }
      });
      if (data.status === 400) {
        setinvaild("username already exists");
      } else {
        const response = await data.json();
        localStorage.setItem("usertoken", response.user_id);
        navigate("/Home");
      }
    }
  });
  return <div className='Signuppage-container'>
    <form action="" onSubmit={handleSubmit}>
      <h3>Singup</h3>
      <span className='error'>{invalid === "username already exists" ? "username already exists" : null}</span>
      <input type="text" placeholder='Username' onChange={handleChange} name='username' defaultValue={values.username} />
      <span>{errors.username}</span>
      <input type="text" placeholder='Password' onChange={handleChange} name='password' defaultValue={values.password} />
      <input type="text" placeholder='Email' onChange={handleChange} name='email' defaultValue={values.email} />
      <button type='submit'>Signup</button>
      <div className='bottom-text'>
        <h4 onClick={() => navigate("/")}>Login</h4>
      </div>
    </form>
  </div>;
}
