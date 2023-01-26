import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const WHODefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [diabetesMellitus, setDiabetesMellitus] = useState<boolean>(false);
  const [insulinResistance, setInsulinResistance] = useState<boolean>(false);
  const [arterialPressure, setArterialPressure] = useState<string>("");
  const [triglycerideLevel, setTriglycerideLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hipCircumference, setHipCircumference] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatine, setCreatine] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (arterialPressure.length === 0) {
      setErrorMessage("Arterial Pressure input is not valid!");
      return false;
    }
    if (triglycerideLevel.length === 0) {
      setErrorMessage("Plasma Triglyceride input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist Circumference input is not valid!");
      return false;
    }
    if (hipCircumference.length === 0) {
      setErrorMessage("Hip Circumference input is not valid!");
      return false;
    }
    if (albumin.length === 0) {
      setErrorMessage("Albumin input is not valid!");
      return false;
    }
    if (creatine.length === 0) {
      setErrorMessage("Creatine input is not valid!");
      return false;
    }
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 0.9;
    } else {
      waistCircumferenceLimit = 0.85;
    }
    if ((glucoseIntolerance && diabetesMellitus) || insulinResistance) {
      return false;
    }
    if (Number(arterialPressure) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(triglycerideLevel) >= 150) {
      overLimitResultCounter++;
    }
    if (
      Number(waistCircumference) / Number(hipCircumference) >=
      waistCircumferenceLimit
    ) {
      overLimitResultCounter++;
    }
    if (Number(albumin) / Number(creatine) >= 30) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 2) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
    } else {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>WHO Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.ratio}>
            <div className={styles.firstRatioTitle}>Gender:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
              className={styles.firstRatioContainer}
            >
              <Radio className={styles.ratio} value={"Male"}>
                Male
              </Radio>
              <Radio className={styles.ratio} value={"Female"}>
                Female
              </Radio>
            </Radio.Group>
          </div>
          <div className={styles.glucoseIntoleranceContainer}>
            <p>Glucose Intolerance:</p>
            <Checkbox
              onChange={() => setGlucoseIntolerance(!glucoseIntolerance)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div className={styles.diabetesMellitusContainer}>
            <p>Diabetes Mellitus:</p>
            <Checkbox
              onChange={() => setDiabetesMellitus(!diabetesMellitus)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div className={styles.insulinResistanceContainer}>
            <p>Insulin Resistance:</p>
            <Checkbox
              onChange={() => setInsulinResistance(!insulinResistance)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div>
            <div className={styles.label}>Arterial Pressure:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setArterialPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Plasma Triglyceride Level:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTriglycerideLevel(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Waist Circumference:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Hip Circumference:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHipCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Albumin:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAlbumin(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Creatine:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCreatine(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <p className={styles.resultMessage}>{resultMessage}</p>
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

export default WHODefinition;
