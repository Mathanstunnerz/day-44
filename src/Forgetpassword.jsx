import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { OTPverification } from "./OTPverification";

export function Forgetpassword() {
  const navigate = useNavigate();
  const [otp, setotp] = useState(false);
  const [forgetpassword, setforgetpassword] = useState([]);
  const formValidationSchema = yup.object({
    username: yup.string().min(5).required(),
    Newpassword: yup.string().min(6).max(15).required(),
    email: yup.string().email().required(),
  });
  const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
    initialValues: { username: '', email: "", Newpassword: '' },
    validationSchema: formValidationSchema,
    onSubmit: async (values) => {
      // console.log(values)
      const login = await fetch("https://linkshortner.onrender.com/Forgetpassword", {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" }
      });
      if (login.status === 400) {
        alert("Username and valid");
      } else {

        const data = await login.json();
        // console.log(data) 
        localStorage.setItem("usertoken", data.user_id);
        alert("Check your email");
        setforgetpassword(values);
        setotp(true);
      }

    }
  });

  return <div className='forgetpassword-container'>

    {otp ? <OTPverification /> : <form action="" onSubmit={handleSubmit}>
      <h3>Forget password</h3>
      <input type="text" placeholder='username' onChange={handleChange} name='username' />
      <input type="text" placeholder='email' onChange={handleChange} name='email' />
      <input type="text" placeholder='New password' onChange={handleChange} name='Newpassword' />
      <button type='submit'>Submit</button>
      <div className='bottom-text'>
        <h4 onClick={() => navigate("/")}>Login</h4>
      </div>
    </form>}


  </div>;
}
