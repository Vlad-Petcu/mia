import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const IDRSDefinition: FC = () => {
  const [age, setAge] = useState<string>("");
  const [waistSize, setWaistSize] = useState<string>("");
  const [physicalActivity, setPhysicalActivity] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (age.length === 0) {
      setErrorMessage("Age input is not valid!");
      return false;
    }
    if (waistSize.length === 0) {
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
    return true;
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
          <p>IDRS Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div>
            <div className={styles.label}>Age:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAge(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Waist Size:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistSize(e.target.value)
              }
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
          <p className={styles.errorMessage}>{errorMessage}</p>
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
