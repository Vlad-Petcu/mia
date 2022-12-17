import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const NCEPATPIIIDefinition: FC = () => {
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hypertriglyceridemia, setHypertriglyceridemia] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [fastingGlucose, setFastingGlucose] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
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
          <div>
            <p>Waist Circumference:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Hypertriglyceridemia:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertriglyceridemia(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>HDLC:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHDLC(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Plasma Glucose:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBloodPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Fasting Glucose:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFastingGlucose(e.target.value)
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

export default NCEPATPIIIDefinition;
