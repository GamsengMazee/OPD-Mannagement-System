import React, { useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaAddressBook } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from 'react-icons/gr'

import "./Navbar.css";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHander = () => {
    setShowMenu(!showMenu);
  };

  
  const activeStyle = {
    color: "#ff333a",
    borderRadius: 4,
    borderBottom: '2px solid #74c6fc',
    paddingBottom: 8
  }
  const inactiveStyle = {
    color: ''
  }

  return (
    <nav className="navbar">
      <h1>BYRNIHAT PHC </h1>
      <div className="menuIcon">
        {!showMenu ? <GiHamburgerMenu size={28} onClick={showMenuHander} /> : <GrFormClose size={25} onClick={showMenuHander}/>}
      </div>
      <div className="menu">
        <ul className="desktop__nav">
          <li>
            <NavLink
              to="/home"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              <IoMdPersonAdd color="black" />
              OUTPATIENT DEPARTMENT
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/emergency"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              <BiError color="red" />
              EMERGENCY
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/patient-records"
              style={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
              }
            >
              <FaAddressBook />
              PATIENTS RECORDS
            </NavLink>
          </li>
        </ul>
      </div>
      {/*Nav Mobile*/}
      {showMenu && (
        <div className="mobile__nav">
          <div className="mobileNav__liWrapper">
            <ul className="mobileNav__ul">
              <li>
                <NavLink
                  to="/home"
                  style={({ isActive }) =>
                    isActive ? { color: "#265ad4" } : { color: "" }
                  }
                >
                  <IoMdPersonAdd color="black" />
                  OUTPATIENT DEPARTMENT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/emergency"
                  style={({ isActive }) =>
                    isActive ? { color: "#265ad4" } : { color: "" }
                  }
                >
                  <BiError color="red" />
                  EMERGENCY
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/patient-records"
                  style={({ isActive }) =>
                    isActive ? { color: "#265ad4" } : { color: "" }
                  }
                >
                  <FaAddressBook />
                  PATIENTS RECORDS
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
