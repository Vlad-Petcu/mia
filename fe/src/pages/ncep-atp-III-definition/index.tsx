import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const NCEPATPIIIDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hypertriglyceridemia, setHypertriglyceridemia] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [fastingGlucose, setFastingGlucose] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (hypertriglyceridemia.length === 0) {
      setErrorMessage("Hypertriglyceridemia input is not valid!");
      return false;
    }
    if (HDLC.length === 0) {
      setErrorMessage("HDLC input is not valid!");
      return false;
    }
    if (bloodPressure.length === 0) {
      setErrorMessage("Blood Pressure input is not valid!");
      return false;
    }
    if (fastingGlucose.length === 0) {
      setErrorMessage("Fasting Glucose input is not valid!");
      return false;
    }
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    let HDLCLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 102;
      HDLCLimit = 40;
    } else {
      waistCircumferenceLimit = 88;
      HDLCLimit = 50;
    }
    if (Number(hypertriglyceridemia) >= 150) {
      overLimitResultCounter++;
    }
    if (Number(HDLC) < 150) {
      overLimitResultCounter++;
    }
    if (Number(waistCircumference) > waistCircumferenceLimit) {
      overLimitResultCounter++;
    }
    if (Number(HDLC) < HDLCLimit) {
      overLimitResultCounter++;
    }
    if (Number(bloodPressure) > 130) {
      overLimitResultCounter++;
    }
    if (Number(fastingGlucose) > 110) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 3) {
      return true;
    } else {
      return false;
    }
  };

  const createNCEPATPIIIDefinition = async (result: boolean) => {
    const response = await axios.post("http://localhost:3000/ncepatpiii", {
      gender,
      waistCircumference,
      hypertriglyceridemia,
      HDLC,
      bloodPressure,
      fastingGlucose,
      result,
      userId: 0,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      createNCEPATPIIIDefinition(true);
    } else {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      createNCEPATPIIIDefinition(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>NCEP ATP III Definition</p>
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
          <div>
            <div>Waist Circumference:</div>
            <Input
              placeholder="cm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div>Hypertriglyceridemia:</div>
            <Input
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertriglyceridemia(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div>HDLC:</div>
            <Input
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHDLC(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div>Blood Pressure:</div>
            <Input
              placeholder="mmHg"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBloodPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div>Fasting Glucose:</div>
            <Input
              placeholder="mg/dl" 
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFastingGlucose(e.target.value)
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

export default NCEPATPIIIDefinition;
