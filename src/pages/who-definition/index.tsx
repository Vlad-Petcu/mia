import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const WHODefinition: FC = () => {
  const [arterialPressure, setArterialPressure] = useState<string>("");
  const [plasmaTriglyceride, setPlasmaTriglyceride] = useState<string>("");
  const [centralObesity, setCentralObesity] = useState<string>("");
  const [microalbuminuria, setMicroalbuminuria] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (arterialPressure.length === 0) {
      setErrorMessage("Arterial Pressure input is not valid!");
      return false;
    }
    if (plasmaTriglyceride.length === 0) {
      setErrorMessage("Plasma Triglyceride input is not valid!");
      return false;
    }
    if (centralObesity.length === 0) {
      setErrorMessage("Central Obesity input is not valid!");
      return false;
    }
    if (microalbuminuria.length === 0) {
      setErrorMessage("Microalbuminuria input is not valid!");
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
          <p>WHO Definition</p>
        </div>
        <div className={styles.formContainer}>
          <div>
            <p>Arterial Pressure:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setArterialPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Plasma Triglyceride:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPlasmaTriglyceride(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Central Obesity:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCentralObesity(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Microalbuminuria:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMicroalbuminuria(e.target.value)
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

export default WHODefinition;
