import { FC } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import MedicalRecord from "../../components/medical-record";

const MyMedicalRecord: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Medical Record</h1>
        <MedicalRecord />
      </div>
      <Footer />
    </>
  );
};

export default MyMedicalRecord;
