import { Routes, Route, Link,useNavigate, Navigate } from "react-router-dom";
import './App.css'
import { Loginpage } from './Loginpage';
import { Signpage } from './Signpage';
import { Forgetpassword } from './Forgetpassword';
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
function App() {


  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Loginpage/>} />
        <Route path="/signup" element={<Signpage/>} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/Home" element={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
       } />
      </Routes>
    </div>
  )
}
function ProtectedRoute({children}) {
  const id = localStorage.getItem('usertoken');
  if(id === undefined) {
    const navigate = useNavigate()
    navigate("/")
  }
  return id ? <selection>{children}</selection> : <Navigate replace to = "/" />
}
function Home() {
  const navigate = useNavigate()
  const token = localStorage.getItem('usertoken');
const [linklist,setlinklist] = useState([])
// console.log(linklist)
const loaddata = async ()=>{
    await fetch(`https://linkshortner.onrender.com/Profile/${token}`,{
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => setlinklist(data.URL_POST))
 
        
}
   useEffect(()=>{

       loaddata()

      },[])
  return <div>
     <nav>
        <h3>Link Sortener</h3>
          <h4 onClick={()=>{
            navigate("/")
            localStorage.clear()
            }}>Logout</h4>
      </nav>
      <div className='home-container'>
     <Linkinput loaddata={loaddata} />
     <Linkoutput linklist={linklist} />
      </div>
   
  </div>
}
function Linkinput({loaddata}){
  const navigate = useNavigate()
  const usertoken = localStorage.getItem("usertoken")
  const validation  = yup.object({
    url: yup.string().url().required(),
  })
  const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
    initialValues: { url: '' },
    validationSchema : validation,
    onSubmit: async (values) => {
        // console.log(values)
        await fetch(`https://getlinkshortner.vercel.app/Addurlpost/${usertoken}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" }
      });
      loaddata()
    }
  });
  return  <form action=" " className="from-container" onSubmit={handleSubmit}>
    <h4>URL Sortener</h4>
    <input type="url" placeholder="URL" onChange={handleChange} name="url"/>
    <button type="submit">Click</button>
  </form>

}
function Linkoutput({linklist}){ 
  const data = linklist
  
  return <div className="link-out-container">
     <h4>Link out</h4>
   {data.map((item,key)=><Cardlink key={key} carditem={item}/>)}
  </div>
}
function Cardlink({carditem}){
  const usertoken = localStorage.getItem("usertoken")
const linkclick = async ()=>{
   try{
    await fetch(`https://linkshortner.onrender.com/${carditem.converted_url}`,{
    method: "GET",
  })
     }
   catch(err){

  console.log(err)

     }
// console.log(carditem.original_url)
window.open(carditem.original_url)

}
  return <div className="cardlink-container">
          <h6>Date : {carditem.Date}</h6>
         <h3 onClick={linkclick}>https://linkshortner.onrender.com/{carditem.converted_url}</h3>
  </div>
}
export default App
