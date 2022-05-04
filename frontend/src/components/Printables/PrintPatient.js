import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { FiSquare } from "react-icons/fi";
import "./PrintPatients.css";


class ComponentToPrint extends React.Component {
  
  render() {
    return (
      <div className="print__docs">
        <div className="print__wrapper">
           <img className="print__logo" src={require('../../images/logo1.png')} alt='logo'/>
          <div className="mt-2">
            <h2 className="text-center">BYRNIHAT PHC</h2>
            <div>
              <div className="uid__wrapper">
                <div className="uid__align">
                  <div className="uid__spacing">
                    <p className="text-center">RiBhoi Meghalaya</p>
                    <p>UID: {this.props.uid}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr" />
          <h5 className="text-center">{this.props.title}</h5>

          <div className="patientDetails__align">
            <div className="patientDetails__margin">
              <div className="patient__details">
                <div className="printDetail__wrapper">
                  <div className="printDetail__center">
                    <div className="print__fields">
                      <label>Name:</label>
                      <p>{this.props.name}</p>
                    </div>
                    <div className="print__fields">
                      <label>Address:</label>
                      <p>{this.props.address}</p>
                    </div>
                    <div className="print__fields overflow">
                      <label>Date:</label>
                      <p>{this.props.dor}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="patient__details">
                <div className="printDetail__wrapper">
                  <div className="printDetail__center">
                    <div className="print__fields">
                      <label>Age:</label>
                      <p>{this.props.age}</p>
                    </div>
                    <div className="print__fields">
                      <label>Phone No. :</label>
                      <p>{this.props.phone}</p>
                    </div>
                    <div className="print__fields">
                      <label>Regd No. :</label>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="patient__details">
                <div className="printDetail__wrapper">
                  <div className="printDetail__center">
                    <div className="print__fields">
                      <label>Gender:</label>
                      <p>{this.props.sex}</p>
                    </div>
                    <div className="print__fields">
                      <label>{this.props.relation}</label>
                      <p>{this.props.relationName}</p>
                    </div>
                    <div className="print__fields">
                      <label>Token No :</label>
                      <p>{this.props.token}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
           
          <div className="consultant__wrapper">
             <div className="consultant__align">
             <p>Consultant : Room no. {this.props.consultant_room}</p>
             </div>
          </div>
          <hr className="hr" />

          {/*Left Content*/}
          <div className="left__content">
            <div className="leftContent__wrapper">
              <div className="leftContent__details">
                <div className="leftContent__header">
                  <h5>Vitals</h5>
                </div>
                <ul>
                  <li><FiSquare className="square__box" />BP.______/_______mmHg</li>
                  <li><FiSquare className="square__box" />PR.__________bpm</li>
                  <li><FiSquare className="square__box" />SPO2.___________%</li>
                  <li><FiSquare className="square__box" />TEMP.____________ºF</li>
                </ul>
              </div>

              <div className="leftContent__details">
                <div className="leftContent__header">
                  <h5>TB Symptoms</h5>
                </div>
                <ul>
                  <li><FiSquare className="square__box" />COUGH</li>
                  <li><FiSquare className="square__box" />FEVER</li>
                  <li><FiSquare className="square__box" />NIGHTSWEAT</li>
                  <li><FiSquare className="square__box" />WEIGHT LOSS</li>
                </ul>
              </div>

              <div className="leftContent__details">
                <div className="leftContent__header">
                  <h5>Investigation</h5>
                </div>
                  <ul>
                    <li><FiSquare className="square__box" />MP SMEAR ___________</li>
                    <li><FiSquare className="square__box" />HB% ____________</li>
                    <li><FiSquare className="square__box" />RBS _____________</li>
                    <li><FiSquare className="square__box" />SPUTUM AFB</li>
                    <li><FiSquare className="square__box" />CBNAAT TB</li>
                    <li><FiSquare className="square__box" />UPT _____________</li>
                    <li><FiSquare className="square__box" />VDRL</li>
                    <li><FiSquare className="square__box" />ICTC</li>
                  </ul>
            </div>

            <div className="leftContent__details">
                <div className="leftContent__header">
                  <h5>Others</h5>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function PrintPatient({
  onClick,
  title,
  name,
  age,
  sex,
  address,
  phone,
  relation,
  relationName,
  consultant_room,
  dor,
  uid,
  token
}) {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary me-2" onClick={onClick}>
              PRINT
            </button>
          )}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{display: 'none'}}>
          <ComponentToPrint
            title={title}
            name={name}
            age={age}
            sex={sex}
            address={address}
            phone={phone}
            relation={relation}
            consultant_room = {consultant_room}
            dor={dor}
            uid={uid}
            token={token}
            relationName={relationName}
            ref={(el) => (componentRef = el)}
          />
        </div>
      </div>
    </>
  );
}
