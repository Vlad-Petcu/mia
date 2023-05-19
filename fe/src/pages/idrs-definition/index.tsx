import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const IDRSDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [physicalActivity, setPhysicalActivity] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (age.length === 0) {
      setErrorMessage("Age input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist size input is not valid!");
      return false;
    }
    if (physicalActivity.length === 0) {
      setErrorMessage("You must chose one of the options for each question!");
      return false;
    }
    if (familyHistory.length === 0) {
      setErrorMessage("You must chose one of the options for each question!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const isPatientDiagnosed = () => {
    let totalScore = 0;
    if (Number(age) >= 35 && Number(age) <= 49) {
      totalScore = totalScore + 20;
    }
    if (Number(age) >= 50) {
      totalScore = totalScore + 30;
    }
    if (
      gender === "Female" &&
      Number(waistCircumference) >= 80 &&
      Number(waistCircumference) <= 89
    ) {
      totalScore = totalScore + 10;
    }
    if (gender === "Female" && Number(waistCircumference) >= 90) {
      totalScore = totalScore + 20;
    }
    if (
      gender === "Male" &&
      Number(waistCircumference) >= 90 &&
      Number(waistCircumference) <= 99
    ) {
      totalScore = totalScore + 10;
    }
    if (gender === "Male" && Number(waistCircumference) >= 100) {
      totalScore = totalScore + 20;
    }
    if (physicalActivity === "2") {
      totalScore = totalScore + 20;
    }
    if (physicalActivity === "3") {
      totalScore = totalScore + 30;
    }
    if (familyHistory === "2") {
      totalScore = totalScore + 10;
    }
    if (familyHistory === "3") {
      totalScore = totalScore + 20;
    }
    if (totalScore >= 60) {
      return true;
    } else {
      return false;
    }
  };

  const createIDRSDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/idrs", {
      gender,
      age,
      waistCircumference,
      physicalActivity,
      familyHistory,
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
        'According to the "IDRS Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createIDRSDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "IDRS Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createIDRSDefinition(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>IDRS Definition</p>
        </div>
        <div className={styles.description}>
          <p>
            Identification of MS can be made more clinical by including clinical
            parameters like age, family history, personal history, etc., as
            parameters to define MS. Indian diabetes risk score (IDRS) is one
            such parameter comprising simple clinical information like age, WC,
            family history of diabetes, and physical activity. IDRS ≥ 60 been
            found to be useful In predicting MS and cardiovascular disease.
          </p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.ratio}>
            <div className={styles.firstRatioTitle}>Gender:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
              className={styles.thirdRatioContainer}
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
            <div className={styles.label}>Age:</div>
            <Input
              value={age}
              placeholder="year"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setAge(e.target.value);
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
            <div className={styles.firstRatioTitle}>Physical Activity:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) =>
                setPhysicalActivity(e.target.value)
              }
              className={styles.firstRatioContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                Exercise regular + strenuous work
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
                Exercise regular or strenuous work
              </Radio>
              <Radio className={styles.ratio} value={"3"}>
                No exercise and sedentary work
              </Radio>
            </Radio.Group>
          </div>
          <div>
            <div className={styles.secondRatioTitle}>Family history:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) =>
                setFamilyHistory(e.target.value)
              }
              className={styles.secondRatioContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                No family history
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
                Either parent
              </Radio>
              <Radio className={styles.ratio} value={"3"}>
                Both parents
              </Radio>
            </Radio.Group>
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

export default IDRSDefinition;
