import { Button, Checkbox } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const AACEDDefinition: FC = () => {
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [abnormalUricAcidMetabolism, setAbnormalUricAcidMetabolism] =
    useState<boolean>(false);
  const [dyslipidemia, setDyslipidemia] = useState<boolean>(false);
  const [hemodynamicChanges, setHemodynamicChanges] = useState<boolean>(false);
  const [prothromboticFactors, setProthromboticFactors] =
    useState<boolean>(false);
  const [markersOfInflammation, setMarkersOFInflammation] =
    useState<boolean>(false);
  const [endothelialDysfunction, setEndothelialDysfunction] =
    useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [isResultPositive, setIsResultPositive] = useState<boolean>();
  const userId = localStorage.getItem("userId");

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    if (glucoseIntolerance) {
      overLimitResultCounter++;
    }
    if (abnormalUricAcidMetabolism) {
      overLimitResultCounter++;
    }
    if (dyslipidemia) {
      overLimitResultCounter++;
    }
    if (hemodynamicChanges) {
      overLimitResultCounter++;
    }
    if (prothromboticFactors) {
      overLimitResultCounter++;
    }
    if (markersOfInflammation) {
      overLimitResultCounter++;
    }
    if (endothelialDysfunction) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter === 7) {
      return true;
    } else {
      return false;
    }
  };

  const createAACEDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/aaced", {
      glucoseIntolerance,
      abnormalUricAcidMetabolism,
      dyslipidemia,
      hemodynamicChanges,
      prothromboticFactors,
      markersOfInflammation,
      endothelialDysfunction,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const handleSubmit = async () => {
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "AACED Definition" your results suggests that YOU MAY BE diagnosed with metabolic syndrome.'
      );
      setIsResultPositive(true);
      if (userId) {
        createAACEDDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "AACED Definition" your results suggests that YOU ARE NOT IN DANGER to be diagnosed with metabolic syndrome.'
      );
      setIsResultPositive(false);
      if (userId) {
        createAACEDDefinition(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>AACED Definition</p>
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.description}>
            <li className={styles.line}>
              The American Association of Clinical Endocrinologists (AACE)
              preferred using the term insulin resistance syndrome over MS.
            </li>
            The major criteria they considered were IGT, elevated triglycerides,
            reduced HDL-C, elevated BP, and obesity.
            <li className={styles.line}>
              They did not specify any particular number of criteria for
              diagnosis, rather they left it to clinical judgment.
            </li>
            <li className={styles.line}>
              They suggested that factors like family history of atherosclerotic
              cardiovascular disease or type 2 DM, polycystic ovary syndrome,
              and hyperuricemia be considered while exercising clinical
              judgement.
            </li>
            <li className={styles.line}>
              Patients with type 2 DM wereexcluded from the definition of
              insulin resistance syndrome.
            </li>
            <li className={styles.line}>The various components suggested by the AACE are as follows:</li>
          </div>
          <div>
            <div className={styles.checkboxContainer}>
              <p>Glucose Intolerance:</p>
              <Checkbox
                onChange={() => setGlucoseIntolerance(!glucoseIntolerance)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Abnormal Uric Acid Metabolism:</p>
              <Checkbox
                onChange={() =>
                  setAbnormalUricAcidMetabolism(!abnormalUricAcidMetabolism)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Dyslipidemia:</p>
              <Checkbox
                onChange={() => setDyslipidemia(!dyslipidemia)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Hemodynamic Changes:</p>
              <Checkbox
                onChange={() => setHemodynamicChanges(!hemodynamicChanges)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Prothrombotic Factors:</p>
              <Checkbox
                onChange={() => setProthromboticFactors(!prothromboticFactors)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Markers Of Inflammation:</p>
              <Checkbox
                onChange={() =>
                  setMarkersOFInflammation(!markersOfInflammation)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Endothelial Dysfunction:</p>
              <Checkbox
                onChange={() =>
                  setEndothelialDysfunction(!endothelialDysfunction)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
          </div>
        </div>
        {resultMessage && (
          <p className={isResultPositive ? styles.errorMessage : styles.resultMessage}>{resultMessage}</p>
        )}
        <div>
          <Button
            className={styles.submitButton}
            onClick={() => handleSubmit()}
          >
            Apply
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AACEDDefinition;
