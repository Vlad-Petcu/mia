import { Button, Checkbox } from "antd";
import { FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const AACEDDefinition: FC = () => {
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [abnormalUricAcidMetabolism, setAbnormalUricAcidMetabolism] = useState<boolean>(false);
  const [dyslipidemia, setDyslipidemia] = useState<boolean>(false);
  const [hemodynamicChanges, setHemodynamicChanges] = useState<boolean>(false);
  const [prothromboticFactors, setProthromboticFactors] = useState<boolean>(false);
  const [markersOfInflammation, setMarkersOFInflammation] = useState<boolean>(false);
  const [endothelialDysfunction, setEndothelialDysfunction] = useState<boolean>(false);

  const isFormValid = () => {
    console.log(glucoseIntolerance);
  };

  const handleSubmit = async () => {
    isFormValid();
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>AACED Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.checkboxContainer}>
            <p>Glucose Intolerance:</p>
            <Checkbox onChange={() => setGlucoseIntolerance(!glucoseIntolerance)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Abnormal Uric Acid Metabolism:</p>
            <Checkbox onChange={() => setAbnormalUricAcidMetabolism(!abnormalUricAcidMetabolism)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Dyslipidemia:</p>
            <Checkbox onChange={() => setDyslipidemia(!dyslipidemia)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Hemodynamic Changes:</p>
            <Checkbox onChange={() => setHemodynamicChanges(!hemodynamicChanges)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Prothrombotic Factors:</p>
            <Checkbox onChange={() => setProthromboticFactors(!prothromboticFactors)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Markers Of Inflammation:</p>
            <Checkbox onChange={() => setMarkersOFInflammation(!markersOfInflammation)} className={styles.checkbox}></Checkbox>
          </div>
          <div className={styles.checkboxContainer}>
            <p>Endothelial Dysfunction:</p>
            <Checkbox onChange={() => setEndothelialDysfunction(!endothelialDysfunction)} className={styles.checkbox}></Checkbox>
          </div>
          <div>
            <Button
              className={styles.submitButton}
              onClick={() => handleSubmit()}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AACEDDefinition;
