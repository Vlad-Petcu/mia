import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const EGSIRDDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [plasmaInsulin, setPlasmaInsulin] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [systolicTension, setSystolicTension] = useState<string>("");
  const [diastolicTension, setDiastolicTension] = useState<string>("");
  const [triglycerideLevel, setTriglycerideLevel] = useState<string>("");
  const [impairedFastingGlucose, setImpairedFastingGlucose] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

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
    if (systolicTension.length === 0) {
      setErrorMessage("Systolic Tension input is not valid!");
      return false;
    }
    if (diastolicTension.length === 0) {
      setErrorMessage("Diastolic Tension input is not valid!");
      return false;
    }
    if (triglycerideLevel.length === 0) {
      setErrorMessage("Triglycerides input is not valid!");
      return false;
    }
    setErrorMessage("");
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
    if (Number(systolicTension) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 90) {
      overLimitResultCounter++;
    }
    if (Number(triglycerideLevel) >= 150) {
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

  const createEGSIRDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/egsird", {
      gender,
      plasmaInsulin,
      waistCircumference,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      impairedFastingGlucose,
      result,
      userId,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "EGSIRD Definition" your results suggests that you may be diagnosed with metabolic syndrome'
      );
      if (userId) {
        createEGSIRDDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "EGSIRD Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome'
      );
      if (userId) {
        createEGSIRDDefinition(false);
      }
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
        <div className={styles.description}>
          <p>
            The European Group for Study of Insulin Resistance (EGIR) proposed a
            modification of the WHO definition, using the term insulin
            resistance syndrome rather than MS. According to the EIGR definition
            the diagnostic criteria included elevated plasma insulin (bigger
            then 75th percentile) plus two other factors from among the
            following:
          </p>
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
              value={plasmaInsulin}
              placeholder="k-th percentile"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setPlasmaInsulin(e.target.value);
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
          <div>
            <div className={styles.label}>Triglyceride Level:</div>
            <Input
              value={triglycerideLevel}
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setTriglycerideLevel(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <p>Impaired fasting glucose:</p>
            <Checkbox
              onChange={() =>
                setImpairedFastingGlucose(!impairedFastingGlucose)
              }
              className={styles.checkbox}
            ></Checkbox>
          </div>
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
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
      </div>
      <Footer />
    </>
  );
};

export default EGSIRDDefinition;
