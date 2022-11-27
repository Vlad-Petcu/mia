import { FC } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import styles from "./index.module.scss";

const Header: FC = () => {
  return (
    <>
      <div className={styles.header}>
        <h1>
          <NavLink to="/">Mia</NavLink>
        </h1>
      </div>
    </>
  );
};

export default Header;
