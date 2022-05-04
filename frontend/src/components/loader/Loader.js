import React, { useEffect, useState } from "react";
import { newPatient } from "../../models/newPatient";
import { storeToken } from "../../store/action/action";
import { useDispatch } from "react-redux";
import "./Loader.css";
function Loader() {
  const [patientsList, setPatientsList] = useState();
  
  const dispatch = useDispatch();
  const todaysDate = new Date().toLocaleDateString("en-GB");

 useEffect(() => {
    if(patientsList){
      const numOfPatients = patientsList.filter((data) => {
        return (data.dor.includes(todaysDate)) 
      });
      dispatch(storeToken(numOfPatients.length))
    }
 }, [dispatch, patientsList, todaysDate])


 

  useEffect(() => {
    const loadedData = [];
    fetch(`${process.env.REACT_APP_BASE_URL}/patientsRecords`)
      .then((response) => {
        response
          .json()
          .then((resData) => {
            for (const key in resData) {
              loadedData.push(
                new newPatient(
                  resData[key]._id,
                  resData[key].uid,
                  resData[key].name,
                  resData[key].address,
                  resData[key].age,
                  resData[key].ageFormat,
                  resData[key].sex,
                  resData[key].phone,
                  resData[key].occupation,
                  resData[key].email,
                  resData[key].relation,
                  resData[key].relationName,
                  resData[key].dor
                )
              );
            }

            setPatientsList(loadedData);
            
          })
          .catch(() => console.log("Error While connecting to Server"));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dispatch]);

  return (
    <div className="loader__container">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      <h5>Loading...</h5>
    </div>
  );
}

export default Loader;
