import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

export function OTPverification() {
  const [otpcheck, setotpcheck] = useState([]);
  console.log("otp", otpcheck);
  const navigate = useNavigate();
  const formValidationSchema2 = yup.object({
    OTP: yup.string().required(),
  });
  const Formik = useFormik({
    initialValues: { OTP: '' },
    validationSchema: formValidationSchema2,
    onSubmit: async (values) => {
      console.log('OTP', values);
      navigate("/Home");

      await fetch(`https://linkshortner.onrender.com/Profile/${localStorage.getItem("usertoken")}`)
        .then(response => response.json())
        .then(data => setotpcheck(data.OTP));

      if (values.OTP === data.OTP) {
        navigate("/Home");
      }

    }
  });
  return <form action="" onSubmit={Formik.handleSubmit}>
    <h3>Forget password</h3>
    <input type="text" placeholder='OTP' onChange={Formik.handleChange} name='OTP' />
    <button type='submit'>Submit</button>
    <div className='bottom-text'>
      <h4 onClick={() => navigate("/")}>Login</h4>
    </div>
  </form>;
}
