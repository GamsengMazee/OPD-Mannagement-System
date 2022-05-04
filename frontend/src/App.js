import "./App.css";
import './components/ResponsiveMobile.css'
import { Routes, Route } from "react-router-dom";
import Loader from "./components/loader/Loader";
import Home from "./components/Home/Home";
import PatientRecords from "./components/PatientRecords/PatientRecords";
import ViewPatient from "./components/PatientRecords/view/ViewPatient";
import { useState } from "react";
import Login from "./components/Login/Login";
import Register from './components/Register/Register'
import FourZeroFour from "./components/error/FourZeroFour";
import Emergency from "./components/Emergency/Emergency";

function App() {
 const [loader, setLoader] = useState(true)
  
  setTimeout(() => {
    setLoader(false)
  }, 3000) 
  
   if(loader){
     return <Loader />
   }   
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/emergency" element={<Emergency />}/>
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/patient-records/view" element={<ViewPatient />}/>
      <Route path='/registerongo' element={<Register /> } />
      <Route path = '*' element={<FourZeroFour />} />
    </Routes>
  );
}

export default App;
