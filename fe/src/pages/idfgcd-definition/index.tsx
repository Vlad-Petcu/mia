import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const IDFGDCDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [tryglycerides, setTryglycerides] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [systolicTension, setSystolicTension] = useState<string>("");
  const [diastolicTension, setDiastolicTension] = useState<string>("");
  const [FPG, setFPG] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [isResultPositive, setIsResultPositive] = useState<boolean>();
  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (location.length === 0) {
      setErrorMessage("You must chose one location!");
      return false;
    }
    if (tryglycerides.length === 0) {
      setErrorMessage("Abdominal Obesity input is not valid!");
      return false;
    }
    if (HDLC.length === 0) {
      setErrorMessage("HDL input is not valid!");
      return false;
    }
    if (systolicTension.length === 0) {
      setErrorMessage("Systolic Tension input is not valid!");
      return false;
    }
    if (diastolicTension.length === 0) {
      setErrorMessage("Diastolic Tension input is not valid!");
      return false;
    }
    if (FPG.length === 0) {
      setErrorMessage("FPG input is not valid!");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 90;
    } else {
      waistCircumferenceLimit = 80;
    }
    if (Number(waistCircumference) >= waistCircumferenceLimit) {
      overLimitResultCounter++;
    }
    if (Number(tryglycerides) >= 150) {
      overLimitResultCounter++;
    }
    if (Number(HDLC) < 40) {
      overLimitResultCounter++;
    }
    if (Number(systolicTension) >= 130) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 85) {
      overLimitResultCounter++;
    }
    if (Number(FPG) >= 100) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 3) {
      return true;
    } else {
      return false;
    }
  };

  const createIDFGCDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/idfgcd", {
      gender,
      location,
      tryglycerides,
      HDLC,
      systolicTension,
      diastolicTension,
      FPG,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "IDFGCD Definition" your results suggests that YOU MAY BE diagnosed with metabolic syndrome.'
      );
      setIsResultPositive(true);
      if (userId) {
        createIDFGCDDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "IDFGCD Definition" your results suggests that YOU ARE NOT IN DANGER to be diagnosed with metabolic syndrome.'
      );
      setIsResultPositive(false);
      if (userId) {
        createIDFGCDDefinition(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>IDFGCD Definition</p>
        </div>
        <div className={styles.sectionsContainer}>
          <div className={styles.description}>
            <li className={styles.line}>
              Against the backdrop of all these controversies related to
              diagnostic criteria and the lack of consensus regarding WC
              cutoffs, the International Diabetes Federation (IDF) released a
              global consensus definition for MS, along with race- and
              gender-specific WC cutoffs.
            </li>
            <li className={styles.line}>
              This definition identified central obesity as an essential
              component of MS and defined MS as central obesity (based on race-
              and gender-specific WC cutoffs) plus any two of the following four
              parameters:
            </li>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.ratio}>
              <div className={styles.firstRatioTitle}>Gender:</div>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
                className={styles.firstRatioContainer}
              >
                <Radio className={styles.ratio} value={"Male"}>
                  Male
                </Radio>
                <Radio className={styles.ratio} value={"Female"}>
                  Female
                </Radio>
              </Radio.Group>
            </div>
            <div className={styles.secondRatioContainer}>
              <div className={styles.firstRatioTitle}>Location:</div>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => setLocation(e.target.value)}
                className={styles.firstRatioContainer}
              >
                <Radio className={styles.ratio} value={"Europe"}>
                  Europe
                </Radio>
                <Radio className={styles.ratio} value={"Rest of the world"}>
                  Rest of the world
                </Radio>
              </Radio.Group>
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
              <div className={styles.label}>Triglyceride Level:</div>
              <Input
                value={tryglycerides}
                placeholder="mg/dl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setTryglycerides(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <div>
              <div className={styles.label}>HDLC:</div>
              <Input
                value={HDLC}
                placeholder="mg/dl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setHDLC(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Systolic Tension:</div>
              <Input
                value={systolicTension}
                placeholder="mm of Hg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setSystolicTension(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Diastolic Tension:</div>
              <Input
                value={diastolicTension}
                placeholder="mm of Hg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setDiastolicTension(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>FPG:</div>
              <Input
                value={FPG}
                placeholder="mg/dl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setFPG(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {resultMessage && (
          <p className={isResultPositive ? styles.errorMessage : styles.resultMessage}>{resultMessage}</p>
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
      <Footer />
    </>
  );
};

export default IDFGDCDefinition;
