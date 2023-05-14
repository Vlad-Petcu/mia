import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const LAPDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [triglyceridesLevel, setTriglyceridesLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (triglyceridesLevel.length === 0) {
      setErrorMessage("Triglycerides Level input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist size input is not valid!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimit = false;
    if (
      gender === "Male" &&
      (Number(waistCircumference) - 65) * Number(triglyceridesLevel) > 60
    ) {
      overLimit = true;
    }
    if (
      gender === "Female" &&
      (Number(waistCircumference) - 65) * Number(triglyceridesLevel) > 32
    ) {
      overLimit = true;
    }
    return overLimit;
  };

  const createLAPDefinition = async (result: boolean) => {
    const response = await axios.post("http://localhost:3000/lap", {
      gender,
      triglyceridesLevel,
      waistCircumference,
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
        'According to the "LAP Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      createLAPDefinition(true);
    } else {
      setResultMessage(
        'According to the "LAP Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      createLAPDefinition(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>LAP Definition</p>
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
            <div className={styles.label}>Waist Circumference:</div>
            <Input
              placeholder="cm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Triglycerides Level:</div>
            <Input
            placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTriglyceridesLevel(e.target.value)
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

export default LAPDefinition;
