import { FC } from "react";
import "../../App.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import homeMiaText from "../../images/homePageHeader.png";
import styles from "./index.module.scss";

const Home: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.homePageHeader}>
          <p className={styles.pageTitle}>
            Welcome to Mia - a healthcare application meant to help people who
            decide to check if they have a possible diagnosis of metabolic
            syndrome.
          </p>
          <img
            className={styles.homeTextImage}
            src={homeMiaText}
            alt="Not for you!"
          ></img>
        </div>
        <div className={styles.homeDescription}>
          <div className={styles.firstLine}>
            Mia offers 8 definitions of the metabolic syndrome which you can
            check by adding your own data and see if you are diagnosed with the
            metabolic syndrome.
          </div>
          <div className={styles.secondLine}>
            Also apart from the checking itself which can be done without
            creating an account, if you chose to create an account you will gain
            the possibility to save your results or to send them to your doctor.
          </div>
        </div>
        <div className={styles.definitionsContainer}>
          <div className={styles.groupContainer}>
            <div className={styles.groupOne}>
              <div className={styles.definition}>
                <b>WHO </b>- World Health Organization
              </div>
              <div className={styles.definition}>
                <b> EGSIRD </b> - European Group for Study of Insulin Resistance
                Definition
              </div>
              <div className={styles.definition}>
                <b>NCEPATPIII</b> - The National Cholesterol Education Program
                Adult Treatment Panel III
              </div>
              <div className={styles.definition}>
                <b>AACED</b> - American Association of Clinical Endocrinologists
                Definition
              </div>
            </div>
          </div>
          <div className={styles.groupContainer}>
            <div className={styles.groupTwo}>
              <div className={styles.definition}>
                <b>IDFGCD</b> - International Diabetes Federation Global
                Consensus Definition
              </div>
              <div className={styles.definition}>
                <b>SDMS</b> - Simplified Definition of Metabolic Syndrome
              </div>
              <div className={styles.definition}>
                <b>IDRS</b> - Indian Diabetes Risk Scoree
              </div>
              <div className={styles.definition}>
                <b>LAP</b> - Lipid Accumulation Product
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
