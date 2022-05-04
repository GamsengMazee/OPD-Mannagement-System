import React, { useEffect, useState } from "react";
import Navbar from "../UI/Navbar";
import "./PatientRecords.css";
import { AiOutlineEye } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import PrintTodaysList from "../Printables/PrintTodaysList";
import { newPatient } from "../../models/newPatient";
import { useNavigate } from "react-router-dom";
import Authenticate from "../../authenticate/Authenticate";

function PatientRecords() {
  const [patientsList, setPatientsList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectDate, setSelectDate] = useState(
    new Date().toLocaleDateString("fr-CA")
  ); //YYYY-MM-DD date format
  const [show, setShow] = useState(false); //display modal
  const [storeId, setStoreId] = useState("");
  

  const navigate = useNavigate();
  
  const searchHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

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
                  resData[key].consultant_room,
                  resData[key].relation,
                  resData[key].relationName,
                  resData[key].dor,
                  resData[key].token
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
  }, [setPatientsList, show]);

  let sNo = 1;
  let dateToggle = new Date(selectDate).toLocaleString("en-GB").slice(0, 10); //convert date to DD-MM-YYYY format

    
  const openModalBtnHandler = (id) => {
    setShow(true);
    setStoreId(id);
  };
   
  //Delete
  const deleteBtnHandler = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/patientsRecords/delete/${storeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
          setShow(false)
      })
      .catch((err) => console.log(err));
  };

 
  //closeModal
  const closeModalBtnHandler = () => {
    setShow(false);
  };
  
  console.log(patientsList)
  return (
    <>
    <Authenticate />
    <div className="records__container">
      <Navbar />
      <div className="searchBar__container">
        <div className="searchBar__wrapper">
          <form className="d-flex align-items-center justify-content-between">
            <div>
              <input
                className="date__selector"
                type="date"
                value={selectDate}
                onChange={(e) => setSelectDate(e.target.value)}
              />
            </div>
            <div>
              <input
                onChange={searchHandler}
                className="form-control search__input me-2"
                type="search"
                value={searchTerm}
                placeholder="Search by name or uid.."
                aria-label="Search"
              />
            </div>
            {!searchTerm && <BiSearchAlt className="search__icon" />}
          </form>
          {/*Print Button*/}
          <div className="print__btn">
            {patientsList && (
              <PrintTodaysList
                selectDate={dateToggle}
                patientsList={patientsList}
              />
            )}
          </div>
        </div>
      </div>
      <div className="table__wrapper">
        <div className="table__align">
          <table className="table table-striped table-hover table__content">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Sex</th>
                <th scope="col">Consultant</th>
              </tr>
            </thead>
            {/*Beware of ternery Operator*/}
            {!patientsList ? (
              <tfoot>
                <tr>
                  <td>
                    <h5 className="text-center mt-5">Loading...</h5>
                  </td>
                </tr>
              </tfoot>
            ) : (
              // two filter  and one map method below
              patientsList
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.uid.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((data) => {
                  if (data.dor.includes(dateToggle)) {
                    return data;
                  }
                  if (selectDate === "0001-01-01") {
                    return data;
                  }
                })
                .map((patientData, index) => {
                  return (
                    <tbody key={patientData.id}>
                      <tr>
                        <th scope="row">{sNo++}.</th>
                        <td className="text__Table">{patientData.name}</td>
                        <td className="text__Table">
                          {patientData.age + " " + patientData.ageFormat}
                        </td>
                        <td className="text__Table">{patientData.address}</td>
                        <td className="text__Table">{patientData.sex}</td>
                        <td className="text__Table">{patientData.email}</td>
                        <td className="text__Table">
                          <AiOutlineEye
                            onClick={() =>
                              navigate("view", { state: patientData })
                            }
                            className="view__icon"
                          />
                        </td>
                        <td>
                          <MdDelete
                            className="delete__icon"
                            onClick={() => openModalBtnHandler(patientData.id)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })
            )}
          </table>
        </div>
      </div>

      {show && (
        <div className="modal__container">
          <div className="modal__wrapper">
            <h5 className="text-center">
              Are you sure you want to delete this patient?
            </h5>
            <div className="d-flex justify-content-center">
              <button
                onClick={deleteBtnHandler}
                className="btn btn-danger me-2"
              >
                DELETE
              </button>
              <button onClick={closeModalBtnHandler} className="btn btn-info">
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default PatientRecords;
