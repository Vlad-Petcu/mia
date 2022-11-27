import { FC } from "react";
import "../../App.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
// import homeImage from "../../images/home.webp";
import styles from "./index.module.scss";

const Home: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>
          Maya is your best solution for renting different types of rooms!
        </h1>
        <p>
          All your company/institution renting room problems can be solve by
          'Maya'.
        </p>
        <p>
          As an open source project we offer the possibility for all entities to
          use our software for free. Our simplistic design will get the chance
          to all category of users to use the application with or without any
          knowledge regarding computers or it!
        </p>
        {/* <img
          className={styles.homeImage}
          src={homeImage}
          alt="Not for you!"
        ></img> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
