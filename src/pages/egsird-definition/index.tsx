import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const EGSIRDDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [plasmaInsulin, setPlasmaInsulin] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hypertension, setHypertension] = useState<string>("");
  const [triglyceridesLevel, setTriglyceridesLevel] = useState<string>("");
  const [impairedFastingGlucose, setImpairedFastingGlucose] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (plasmaInsulin.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist Circumference input is not valid!");
      return false;
    }
    if (hypertension.length === 0) {
      setErrorMessage("Hypertension input is not valid!");
      return false;
    }
    if (triglyceridesLevel.length === 0) {
      setErrorMessage("Triglycerides input is not valid!");
      return false;
    }
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 94;
    } else {
      waistCircumferenceLimit = 80;
    }
    if (Number(plasmaInsulin) <= 75) {
      return false;
    }
    if (Number(waistCircumference) >= waistCircumferenceLimit) {
      overLimitResultCounter++;
    }
    if (Number(hypertension) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(triglyceridesLevel) >= 150) {
      overLimitResultCounter++;
    }
    if (impairedFastingGlucose) {
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
        'According to the "WHO Definition" your results suggests that you may be diagnosed with metabolic syndrome'
      );
    } else {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome'
      );
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>EGSIRD Definition</p>
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
            <div className={styles.label}>Plasma Insulin:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPlasmaInsulin(e.target.value)
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
            <div className={styles.label}>Hypertension:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertension(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Triglycerides Level:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTriglyceridesLevel(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <p>Impaired fasting glucose:</p>
            <Checkbox
              onChange={() => setImpairedFastingGlucose(!impairedFastingGlucose)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <p className={styles.errorMessage}>{resultMessage}</p>
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

export default EGSIRDDefinition;
