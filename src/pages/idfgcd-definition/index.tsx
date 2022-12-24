import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const IDFGDCDefinition: FC = () => {
  const [tryglycerides, setTryglycerides] = useState<string>("");
  const [HDL, setHDL] = useState<string>("");
  const [bloodPresure, setBloodPresure] = useState<string>("");
  const [FPG, setFPG] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (tryglycerides.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (HDL.length === 0) {
      setErrorMessage("HDL input is not valid!");
      return false;
    }
    if (bloodPresure.length === 0) {
      setErrorMessage("Blood Presure input is not valid!");
      return false;
    }
    if (FPG.length === 0) {
      setErrorMessage("FPG input is not valid!");
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
          <p>IDFGCD Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div>
            <p>Tryglycerides:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTryglycerides(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>HDL:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHDL(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Blood Presure:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBloodPresure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>FPG:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFPG(e.target.value)
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

export default IDFGDCDefinition;
