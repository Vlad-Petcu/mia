import { FC } from "react";
import "../../App.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import homeImage from "../../imgaes/home.webp";
import styles from "./index.module.scss";

const Home: FC = () => {

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <p className={styles.pageTitle}>
          Mia is a healthcare application meant to help people who decide to
          check if they have a possible diagnosis of metabolic syndrome.
        </p>
        <p>
          Mia offers 8 definitions of the metabolic syndrome which you can check
          by adding your own data and see if you are diagnosed with the
          metabolic syndrome.
        </p>
        <p>
          Also apart from the checking itself which can be done without creating
          an account, if you chose to create an account you will gain the
          possibility to save your results or to send them to your doctor.
        </p>
        <div className={styles.imageContainer}>
          <img
            className={styles.homeImage}
            src={homeImage}
            alt="Not for you!"
          ></img>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
