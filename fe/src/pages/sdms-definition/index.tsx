import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const SDMSDefinition: FC = () => {
  const [height, setHeight] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");

  const isFormValid = () => {
    if (height.length === 0) {
      setErrorMessage("Height input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist Circumference is not valid!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const isPatientDiagnosed = () => {
    if (Number(height) / Number(waistCircumference) > 0.5) {
      return true;
    } else {
      return false;
    }
  };

  const createSDMSDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/sdms", {
      height,
      waistCircumference,
      result,
      userId: 0,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "SDMS Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      createSDMSDefinition(true);
    } else {
      setResultMessage(
        'According to the "SDMS Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      createSDMSDefinition(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>SDMS Definition</p>
        </div>
        <div className={styles.description}>
          <p>
            In view of all the above evidence, we have proposed that WC be
            replaced by ICO in all definitions of MS. With the use of ICO,
            the need for various race- and gender-specific cutoffs for WC can be
            obviated. Although a number of studies have proposed ICO cutoffs
            ranging between 0.45 and 0.55, we propose the use of a simple cutoff
            of 0.5 across both genders and all races. MS is a screening tool,
            and we believe that it should be used to identify people at high
            risk of metabolic complications and cardiovascular disease so that
            further detailed investigations can be performed. This definition
            translates into a very simple message to the community If your
            waist size is more than half of your height, you should consult your
            doctor. Thus, all patients with ICO lower then 0.5 should be
            evaluated for high blood pressure, prediabetes, and dyslipidemia.
          </p>
        </div>
        <div className={styles.formContainer}>
          <div>
            <div className={styles.label}>Height:</div>
            <Input
              placeholder="cm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHeight(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Waist Circumference:</div>
            <Input
              placeholder="cm"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWaistCircumference(e.target.value)
              }
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

export default SDMSDefinition;
