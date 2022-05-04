import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { v4 as uuid } from 'uuid';
import Navbar from "../UI/Navbar";
import "./Home.css";
import PrintPatient from "../Printables/PrintPatient";
import { useSelector, useDispatch } from "react-redux";
import Authenticate from "../../authenticate/Authenticate";
import { storeToken } from '../../store/action/action'



function Home() {
  const [uid, setUid] = useState(uuid().slice(0, 8))   //generate uid with uuid
  const [dor, setDor] = useState(new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString())
  const initialValue = {
    uid: uid,
    name: "",
    address: "",
    age: "",
    ageFormat: "",
    sex: "",
    phone: "",
    occupation: "",
    consultant_room: "",
    relation: "",
    relationName: "",
    dor: dor,
    token: 0
  };
  const [formState, setFormState] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
 
  const dispatch = useDispatch()
 

  const handleClose = (e) => {
    setShow(false);
    dispatch(storeToken(formState.token))
    setFormState(initialValue)
  };

  const inputHandler = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;

    setFormState((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "*Name is required.";
    }
    if (!values.address) {
      errors.address = "*Address is required.";
    }
    if (!values.age) {
      errors.age = "*Age cannot be Empty.";
    } else if (!values.ageFormat) {
      errors.age = "*select age Format";
    }
    if (!values.sex) {
      errors.sex = "*Please Select Gender.";
    }
    if (values.phone.length > 10) {
      errors.phone = "*Invalid phone number.";
    }
    if (!values.consultant_room) {
      errors.consultant_room = "*Please Select consultant room.";
    }

    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formState));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      fetch(`${process.env.REACT_APP_BASE_URL}/addPatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: formState.uid,
          name: formState.name,
          address: formState.address,
          age: formState.age,
          ageFormat: formState.ageFormat,
          sex: formState.sex,
          phone: formState.phone,
          occupation: formState.occupation,
          consultant_room: formState.consultant_room,
          relation: formState.relation,
          relationName: formState.relationName,
          dor: dor,
          token: formState.token
        }),
      })
        .then(() => {
          setShow(true)
          setUid(uuid().slice(0, 8))
          setDor(new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString())
        })
        .catch((err) => console.log(err.message));

      console.log("useEffect called");
    }
  }, [formErrors, isSubmit]);

  const resetHandler = (e) => {
    e.preventDefault();
    setFormState(initialValue);
  };

  //Load currentToken from redux
  const reduxData = useSelector((state) => state.reducer.currentTokenNo)
 
 
  useEffect(() =>{
     setFormState(pre => {
       return{
         ...pre,
         token: reduxData + 1
       }
     })
  }, [reduxData])
   
   console.log(formState.token)
  return (
    <>
    <Authenticate />
      <div className="home">
        <Navbar />
        <div className="home__container">
          <form onSubmit={submitHandler} className="home__form">
            <div className="homeForm__header">
              <h4>PATIENT DETAILS</h4>
            </div>
            <div className="align__fields">
              <div className="input__wrapper">
                <label>
                  <span style={{ color: "red" }}>*</span>Name:
                </label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="name"
                  value={formState.name}
                  required
                />
                <div className="error__wrapper">
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {formErrors.name}
                  </p>
                </div>
              </div>
              <div className="input__wrapper">
                <label>
                  <span style={{ color: "red" }}>*</span>Address:
                </label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="address"
                  value={formState.address}
                  required
                />
                <div className="error__wrapper">
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {formErrors.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="align__fields">
              <div className="input__wrapper">
                <label>
                  <span style={{ color: "red" }}>*</span>Age:
                </label>
                <div className="db__input">
                  <input
                    onChange={inputHandler}
                    type="number"
                    name="age"
                    value={formState.age}
                    required
                  />
                  <select
                    className="select__age"
                    onChange={inputHandler}
                    name="ageFormat"
                    value={formState.ageFormat}
                  >
                    <option value="">Select</option>
                    <option value="years">years</option>
                    <option value="months">months</option>
                    <option value="weeks">weeks</option>
                    <option value="days">days</option>
                  </select>
                </div>
                <div className="error__wrapper">
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {formErrors.age}
                  </p>
                </div>
              </div>
              <div className="input__wrapper">
                <label>
                  <span style={{ color: "red" }}>*</span>Sex:
                </label>
                <select
                  onChange={inputHandler}
                  name="sex"
                  value={formState.sex}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                <div className="error__wrapper">
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {formErrors.sex}
                  </p>
                </div>
              </div>
            </div>
            <div className="align__fields">
              <div className="input__wrapper">
                <label>Phone:</label>
                <input
                  onChange={inputHandler}
                  type="number"
                  name="phone"
                  value={formState.phone}
                />
                <div className="error__wrapper">
                  <p style={{ color: "red", fontSize: "10px" }}>
                    {formErrors.phone}
                  </p>
                </div>
              </div>
              <div className="input__wrapper">
                <label>Occupation:</label>
                <input
                  onChange={inputHandler}
                  type="text"
                  name="occupation"
                  value={formState.occupation}
                />
                <div className="error__wrapper"></div>
              </div>
            </div>
            <div className="align__fields">
            <div className="input__wrapper">
            <label>
              <span style={{ color: "red" }}>*</span>Consultant :
            </label>
            <select
              onChange={inputHandler}
              name="consultant_room"
              value={formState.consultant_room}
            >
              <option value="">Select</option>
              <option value="8">Room No. 8</option>
              <option value="14">Room No. 14</option>
              <option value="16">Room No. 16</option>
            </select>
            <div className="error__wrapper">
              <p style={{ color: "red", fontSize: "10px" }}>
                {formErrors.consultant_room}
              </p>
            </div>
          </div>
              <div className="input__wrapper">
                <label>Relation:</label>
                <div className="db__input">
                  <select
                    className="select__opt"
                    onChange={inputHandler}
                    name="relation"
                    value={formState.relation}
                  >
                    <option value="">Select</option>
                    <option value="C/o">C/O</option>
                    <option value="S/o">S/O</option>
                    <option value="D/o">D/O</option>
                    <option value="W/o">W/O</option>
                  </select>
                  <input
                    onChange={inputHandler}
                    type="text"
                    name="relationName"
                    value={formState.relationName}
                  />
                </div>
              </div>
            </div>
            <div className="button__wrapper">
              <button
                onClick={submitHandler}
                type="submit"
                className="btn btn-primary me-2"
              >
                SUBMIT
              </button>

              <button
                type="button"
                onClick={resetHandler}
                className="btn btn-success"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
        {/*Modal Start*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Patients Added Successfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to Print OPD Document Now?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <PrintPatient
              title= 'OUTPATIENT DEPARTMENT'
              name={formState.name}
              address={formState.address}
              age={formState.age + " " + formState.ageFormat}
              sex={formState.sex}
              phone={formState.phone ? `+91 ${formState.phone}`: ''}
              relation={formState.relation ? `${formState.relation}:` : ""}
              relationName={formState.relationName}
              dor={dor}
              consultant_room = {formState.consultant_room}
              uid={formState.uid}
              token ={formState.token}
              onClick={handleClose}
            />
          </Modal.Footer>
        </Modal>
        {/*Modal Ends*/}
      </div>
    </>
  );
}

export default Home;
