import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../App.css";
import logo from "../../imgaes/logoMsd.png";
import styles from "./index.module.scss";

const Header: FC = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isDoctor");
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <h1>
            <NavLink to="/">
              <img className={styles.logo} src={logo} alt="Not for you!"></img>
            </NavLink>
          </h1>
          <div className={styles.navElements}>
            {userId ? (
              <div
                className={styles.navBarElement}
                onClick={() => handleLogOut()}
              >
                <div
                  className={styles.headerBtn}
                  onClick={() => navigate("/log-out")}
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className={styles.navBarElement}>
                <div
                  className={styles.headerBtn}
                  onClick={() => navigate("/log-in")}
                >
                  Login |
                </div>
              </div>
            )}
            <div className={styles.navBarElement}>
              <div
                className={styles.headerBtn}
                onClick={() => navigate("/sign-in")}
              >
                Register
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
