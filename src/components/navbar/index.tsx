import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar: FC = () => {
  const [showNav, setShowNav] = useState(false);

  const handleShowNavbar = () => {
    setShowNav(!showNav);
  };

  const isDoctor = true;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <h1>
            <IconButton
              aria-label={"Open Menu"}
              colorScheme="blue"
              icon={<HamburgerIcon />}
            />
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
              {isDoctor ? (
                <NavLink to="/my-patients">My patients</NavLink>
              ) : (
                <NavLink to="/my-medical-record">My Medical Record</NavLink>
              )}
            </li>
            <li>
              <NavLink to="/log-in">Login</NavLink>
            </li>
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
