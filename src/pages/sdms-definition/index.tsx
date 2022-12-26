import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const SDMSDefinition: FC = () => {
  const [height, setHeight] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (height.length === 0) {
      setErrorMessage("Height input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist Circumference is not valid!");
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
          <p>SDMS Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div>
            <div className={styles.label}>Height:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.target.value)
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

export default SDMSDefinition;
