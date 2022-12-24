import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const SDMSDefinition: FC = () => {

  const [height, setHeight] = useState<string>("");
  const [waistSize, setWaistSize] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (height.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (waistSize.length === 0) {
      setErrorMessage("HDL input is not valid!");
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
            <p>Height:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Waist Size:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistSize(e.target.value)
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
