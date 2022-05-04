import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Card from "../../UI/Card";
import Navbar from "../../UI/Navbar";
import MyVerticallyCenteredModal from "../../UI/MyVerticallyCenteredModal";
import "./ViewPatient.css";
import { Button } from "react-bootstrap";
import Authenticate from "../../../authenticate/Authenticate";

function ViewPatient() {
  const location = useLocation();
  const navigate = useNavigate()
  const [modalShow, setModalShow] = React.useState(false);
  const[patientData, setPatientData] = useState(location.state)
  
  console.log(patientData)

  const onUpdate = (updatedData) => {
      setPatientData(updatedData)
  }


  return (
    <>
    <Authenticate />
    <div className="view__patient">
      <Navbar />
      {/*Bread Crumbs*/}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink className='crumb__patientRecords' to="/patient-records">Patients Records</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            View Patient
          </li>
        </ol>
      </nav>
      {/*Card*/}
      <div className="card__container">
        <Card>
          <div className="cardText__container">
            <div className="cardText__Wrapper">
              <div className="cardText__align">
                <label>Uid:</label>
                <p>{patientData.uid}</p>
              </div>
              <div className="cardText__align">
                <label>Date Of Registration: </label>
                <p>{patientData.dor.slice(0, 10)}</p>
              </div>
            </div>

            <div className="cardText__Wrapper">
              <div className="cardText__align">
                <label>Name:</label>
                <p>{patientData.name}</p>
              </div>
              <div className="cardText__align">
                <label>Address: </label>
                <p>{patientData.address}</p>
              </div>
              <div className="cardText__align">
                <label>Age: </label>
                <p>{patientData.age + " " + patientData.ageFormat}</p>
              </div>
            </div>

            <div className="cardText__Wrapper">
              <div className="cardText__align">
                <label>Sex:</label>
                <p>{patientData.sex}</p>
              </div>
              <div className="cardText__align">
                <label>Phone: </label>
                <p>{patientData.phone}</p>
              </div>
              <div className="cardText__align">
                <label>{patientData.relation ? (patientData.relation + ':') : ''} </label>
                <p>{patientData.relationName}</p>
              </div>
            </div>

            <div className="cardText__Wrapper">
              <div className="cardText__align">
                <label>Consultant Room:</label>
                <p>{patientData.email}</p>
              </div>
            </div>
          </div>
          <div className="EditButton__wrapper">
            <Button className="btn__edit btn-primary"  onClick={() => setModalShow(true)}>EDIT</Button>
            <Button className="btn__edit btn-danger"  onClick={() => navigate('/patient-records')}>CLOSE</Button>
          </div>
        </Card>
      </div>

      <MyVerticallyCenteredModal
      patient={patientData}
      onUpdate={onUpdate}
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
    </div>
    </>
  );
}

export default ViewPatient;
