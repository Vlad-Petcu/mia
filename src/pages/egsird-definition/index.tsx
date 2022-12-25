import { Button, Input, Radio, RadioChangeEvent } from "antd";
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
  const [plasmaGlucose, setPlasmaGlucose] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    if (plasmaGlucose.length === 0) {
      setErrorMessage("Plasma Glucose input is not valid!");
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
          <p>EGSIRD Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.ratio}>
            <div className={styles.firstRatioTitle}>Gender:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
              className={styles.firstRatioContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                Male
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
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
          <div>
            <div className={styles.label}>Plasma Glucose:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPlasmaGlucose(e.target.value)
              }
              className={styles.input}
            />
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

export default EGSIRDDefinition;
