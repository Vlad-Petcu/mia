import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const LAPDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [triglycerideLevel, setTriglyceridesLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (triglycerideLevel.length === 0) {
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
      (Number(waistCircumference) - 65) * Number(triglycerideLevel) > 60
    ) {
      overLimit = true;
    }
    if (
      gender === "Female" &&
      (Number(waistCircumference) - 65) * Number(triglycerideLevel) > 32
    ) {
      overLimit = true;
    }
    return overLimit;
  };

  const createLAPDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/lap", {
      gender,
      triglycerideLevel,
      waistCircumference,
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
        'According to the "LAP Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createLAPDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "LAP Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createLAPDefinition(false);
      }
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
        <div className={styles.description}>
          <p>
            In view of the role of central obesity and dyslipidemia in
            atherosclerotic process, an alternative continuous index of lipid
            overaccumulation, the lipid accumulation product (LAP), has been
            proposed. LAP is computed using WC and fasting triglycerides level
            (in mmol/l): (WC - 65) x TG (men) and (WC - 58) x TG (women).[46]
            This parameter has been found to be better than BMI for predicting
            diabetes and has also been suggested for use in the identification
            MS. It has been shown to be a good predictor of cardiovascular
            disease though one study has shown that it may not be better than
            ICO or WHR for predicting cardiovascular disease.
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
            <div className={styles.label}>Triglyceride Level:</div>
            <Input
              value={triglycerideLevel}
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setTriglyceridesLevel(e.target.value);
              }}
              className={styles.input}
            />
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

export default LAPDefinition;
