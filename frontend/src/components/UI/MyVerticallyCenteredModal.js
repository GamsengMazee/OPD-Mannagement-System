import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import './Modal.css'

function MyVerticallyCenteredModal(props) {
  const [patientData, setPatientData] = useState(props.patient);
  const [success, setSuccess] = useState(false);

  const inputHandler = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;

    setPatientData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const updateBtnHandler = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/patientsUpdate/${patientData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: patientData.name,
        address: patientData.address,
        age: patientData.age,
        ageFormat: patientData.ageFormat,
        sex: patientData.sex,
        phone: patientData.phone,
        relation: patientData.relation,
        relationName: patientData.relationName,
      }),
    })
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false)
        }, 1500)
      })
      .catch((err) => console.log(err.message));
  };

   useEffect(() => {
     if(success){
       props.onUpdate(patientData)
     }
   }, [patientData, props, success])
   
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       { success && <div style={{ width: "50%", height: "10px", marginLeft: "30%" }}>
          <Alert variant="success text-center">
            <p>The Patient Details has been updated successfully.</p>
          </Alert>
        </div>}
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalInput__container">
            <form className="verticallyCenteredModalForm">
              <div className="modalInput__wrapper">
                <div>
                  <label>
                    <span ></span>Name:
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  onChange={inputHandler}
                  value={patientData.name}
                  required
                  placeholder="Name"
                />
              </div>

              <div className="modalInput__wrapper">
                <label>
                  <span style={{ color: "red" }}></span>Address:
                </label>
                <input
                  type="text"
                  name="address"
                  value={patientData.address}
                  required
                  onChange={inputHandler}
                  placeholder="Address"
                />
              </div>

              <div className="modalInput__wrapper">
                <label>
                  <span style={{ color: "red" }}></span>Age:
                </label>
                <input
                  onChange={inputHandler}
                  type="number"
                  name="age"
                  value={patientData.age}
                  placeholder="Age"
                  required
                />
                <select
                  className="select__age"
                  name="ageFormat"
                  onChange={inputHandler}
                  value={patientData.ageFormat}
                >
                  <option value="">Select</option>
                  <option value="years">years</option>
                  <option value="months">months</option>
                  <option value="weeks">weeks</option>
                  <option value="days">days</option>
                </select>
              </div>

              <div style={{ marginTop: '20px' }} className="modalInput__wrapper">
                <label>
                  <span></span>Sex:
                </label>
                <select
                  name="sex"
                  onChange={inputHandler}
                  value={patientData.sex}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="modalInput__wrapper">
                <div>
                  <label>
                    <span style={{ color: "red" }}></span>Phone:
                  </label>
                </div>
                <input
                  type="number"
                  name="phone"
                  required
                  onChange={inputHandler}
                  value={patientData.phone ? patientData.phone : ""}
                  placeholder="Phone"
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateBtnHandler}>SUBMIT</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
