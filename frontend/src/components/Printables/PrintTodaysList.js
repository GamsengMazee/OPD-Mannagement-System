import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import "./PrintPatients.css";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="list__wrapper">
        <div className="listHeader__Wrapper mx-5">
          <h4>OPD Summary</h4>
          <h6>Date: {this.props.selectDate}</h6>
          {/*length of data only from selected date*/}
          <h6>
            Total:{" "}
            {this.props.patientsList.filter((data) => {
              return (data.dor.includes(this.props.selectDate))
            }).length}
          </h6>
        </div>
        <div className="table__wrapper">
          <div className="table__align">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Address</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Consultant</th>
                </tr>
              </thead>
              {this.props.patientsList
                .filter((data) => {
                  return (data.dor.includes(this.props.selectDate))
                })
                .map((patientData, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">{index + 1}.</th>
                        <td>{patientData.name}</td>
                        <td>{patientData.age}</td>
                        <td>{patientData.address}</td>
                        <td>{patientData.sex}</td>
                        <td>{patientData.phone}</td>
                        <td>Room no. {patientData.email}</td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default function PrintTodaysList({ patientsList, selectDate }) {
  let componentRef = useRef();
  
  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button className="btn btn-secondary">PRINT</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint
            selectDate={selectDate}
            patientsList={patientsList}
            ref={(el) => (componentRef = el)}
          />
        </div>
      </div>
    </>
  );
}
