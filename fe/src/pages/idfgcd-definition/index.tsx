import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const IDFGDCDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [tryglycerides, setTryglycerides] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [bloodPresure, setBloodPresure] = useState<string>("");
  const [FPG, setFPG] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
          <div className={styles.secondRatioContainer}>
            <div className={styles.firstRatioTitle}>Location:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setLocation(e.target.value)}
              className={styles.firstRatioContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                Europe
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
                USA
              </Radio>
              <Radio className={styles.ratio} value={"3"}>
                Rest of the world
              </Radio>
            </Radio.Group>
          </div>
          <div>
            <div className={styles.label}>Tryglycerides:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTryglycerides(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>HDLC:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHDLC(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Blood Presure:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBloodPresure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>FPG:</div>
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
