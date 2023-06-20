import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const WHODefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [diabetesMellitus, setDiabetesMellitus] = useState<boolean>(false);
  const [insulinResistance, setInsulinResistance] = useState<boolean>(false);
  const [systolicTension, setSystolicTension] = useState<string>("");
  const [diastolicTension, setDiastolicTension] = useState<string>("");
  const [triglycerideLevel, setTriglycerideLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hipCircumference, setHipCircumference] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatine, setCreatine] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (systolicTension.length === 0) {
      setErrorMessage("Systolic Tension input is not valid!");
      return false;
    }
    if (diastolicTension.length === 0) {
      setErrorMessage("Diastolic Tension input is not valid!");
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
    setErrorMessage("");
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
    if (
      glucoseIntolerance === false &&
      diabetesMellitus === false &&
      insulinResistance === false
    ) {
      return false;
    }
    if (Number(systolicTension) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 90) {
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

  const createWHODefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/who", {
      gender,
      glucoseIntolerance,
      diabetesMellitus,
      insulinResistance,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      waistCircumference,
      hipCircumference,
      albumin,
      creatine,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that YOU MAY BE diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createWHODefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that YOU ARE NOT IN DANGER to be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createWHODefinition(false);
      }
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
        <div className={styles.sectionsContainer}>
          <div className={styles.description}>
            <p>
              WHO, in 1999, suggested a working definition of metabolic syndrome
              (MS), which was to be improved in due course of time. WHO defined
              MS as glucose intolerence, impaired glucose tolerance (IGT) or
              diabetes mellitus (DM), and/or insulin resistance, together with
              two or more of the other components listed below.
            </p>
          </div>
          <div>
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
              <div className={styles.label}>Systolic Tension:</div>
              <Input
                value={systolicTension}
                placeholder="mm of Hg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setSystolicTension(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Diastolic Tension:</div>
              <Input
                value={diastolicTension}
                placeholder="mm of Hg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setDiastolicTension(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <div>
              <div className={styles.label}>Triglyceride Level:</div>
              <Input
                value={triglycerideLevel}
                placeholder="mm/dl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setTriglycerideLevel(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Waist Circumference:</div>
              <Input
                value={waistCircumference}
                placeholder="cm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setWaistCircumference(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Hip Circumference:</div>
              <Input
                value={hipCircumference}
                placeholder="cm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setHipCircumference(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Albumin:</div>
              <Input
                value={albumin}
                placeholder="μgm/minute"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setAlbumin(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Creatine:</div>
              <Input
                value={creatine}
                placeholder="μgm/mg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setCreatine(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {resultMessage && (
          <p className={styles.resultMessage}>{resultMessage}</p>
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

export default WHODefinition;
