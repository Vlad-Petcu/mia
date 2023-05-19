import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar: FC = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShowNavbar = () => {
    setShowNav(!showNav);
  };

  const isDoctor = localStorage.getItem("isDoctor");
  const userId = localStorage.getItem("userId");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isDoctor");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <h1>
            <Button aria-label={"Open Menu"} icon={<MenuOutlined />} />
          </h1>
        </div>
        <div className={`nav-elements  ${showNav && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-definitions">All Definitions</NavLink>
            </li>
            <li>
              <NavLink to="/who-definition">WHO</NavLink>
            </li>
            <li>
              <NavLink to="/egsird-definition">EGSIRD</NavLink>
            </li>
            <li>
              <NavLink to="/aaced-definition">AACED</NavLink>
            </li>
            <li>
              <NavLink to="/ncep-atp-III-definition">NCEP ATP III</NavLink>
            </li>
            <li>
              <NavLink to="/idfgcd-definition">IDFGCD</NavLink>
            </li>
            <li>
              <NavLink to="/sdms-definition">SDMS</NavLink>
            </li>
            <li>
              <NavLink to="/idrs-definition">IDRS</NavLink>
            </li>
            <li>
              <NavLink to="/lap-definition">LAP</NavLink>
            </li>
            <li>
              <NavLink to="/my-medical-record">Medical Record</NavLink>
            </li>
            {isDoctor && (
              <li>
                <NavLink to="/my-patients">Patients</NavLink>
              </li>
            )}
            {userId ? (
              <li onClick={() => handleLogOut()}>
                <NavLink to="/log-in">Logout</NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/log-in">Login</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/sign-in">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
