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

  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <div>
            <Button aria-label={"Open Menu"} icon={<MenuOutlined />} />
          </div>
        </div>
        <div className={`nav-elements  ${showNav && "active"}`}>
          <ul>
            <li className="navBarElement">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/aaced-definition">AACED</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/egsird-definition">EGSIRD</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/idfgcd-definition">IDFGCD</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/idrs-definition">IDRS</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/lap-definition">LAP</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/ncep-atp-III-definition">NCEP ATP III</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/sdms-definition">SDMS</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/who-definition">WHO</NavLink>
            </li>
            <li className="navBarElement">
              <NavLink to="/all-definitions">All Definitions</NavLink>
            </li>
            {userId && (
              <li className="navBarElement">
                <NavLink to="/my-medical-record">Medical Record</NavLink>
              </li>
            )}
            {isDoctor === "true" && (
              <li className="navBarElement">
                <NavLink to="/my-patients">Patients</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
