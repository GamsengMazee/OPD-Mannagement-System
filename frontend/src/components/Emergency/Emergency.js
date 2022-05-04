import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Navbar from "../UI/Navbar";
import "./Emergency.css";
import PrintPatient from "../Printables/PrintPatient";
import Authenticate from "../../authenticate/Authenticate";



function Emergency() {

  const dor = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString()
  const initialValue = {
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
  };
  const [formState, setFormState] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
 
 

  const handleClose = (e) => {
    setShow(false);
    setFormState(initialValue);
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
  };

  useEffect(() => {
    if (Object.keys(formErrors).length !== 0){
      return
    }else{
      setShow(true)
    }
  }, [formErrors])


  const resetHandler = (e) => {
    e.preventDefault();
    setFormState(initialValue);
  };

  return (
    <>
    <Authenticate />
      <div className="home">
        <Navbar />
        <div className="home__container">
          <form className="home__form">
            <div className="homeForm__header">
              <h4 className="text-danger fw-bold">EMERGENCY</h4>
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
                    <option value="C/o">C/o</option>
                    <option value="S/o">S/o</option>
                    <option value="D/o">D/o</option>
                    <option value="W/o">W/o</option>
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
            <Modal.Title>Print Emergency document now?</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-danger fw-bold">*Note: Emergency data are not stored in database</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <PrintPatient
              title='EMERGENCY'
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
              onClick={handleClose}
            />
          </Modal.Footer>
        </Modal>
        {/*Modal Ends*/}
      </div>
    </>
  );
}

export default Emergency;
