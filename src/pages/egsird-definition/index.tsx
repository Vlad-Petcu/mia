import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const EGSIRDDefinition: FC = () => {
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hypertension, setHypertension] = useState<string>("");
  const [triglycerides, setTriglycerides] = useState<string>("");
  const [plasmaGlucose, setPlasmaGlucose] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (waistCircumference.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (hypertension.length === 0) {
      setErrorMessage("Hypertension input is not valid!");
      return false;
    }
    if (triglycerides.length === 0) {
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
            <p>Hypertension:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertension(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Triglycerides:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTriglycerides(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Plasma Glucose:</p>
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
