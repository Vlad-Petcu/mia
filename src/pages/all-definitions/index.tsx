import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const WHODefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [diabetesMellitus, setDiabetesMellitus] = useState<boolean>(false);
  const [insulinResistance, setInsulinResistance] = useState<boolean>(false);
  const [arterialPressure, setArterialPressure] = useState<string>("");
  const [triglycerideLevel, setTriglycerideLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hipCircumference, setHipCircumference] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatine, setCreatine] = useState<string>("");
  const [plasmaInsulin, setPlasmaInsulin] = useState<string>("");
  const [hypertension, setHypertension] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [plasmaGlucose, setPlasmaGlucose] = useState<string>("");
  const [abnormalUricAcidMetabolism, setAbnormalUricAcidMetabolism] =
    useState<boolean>(false);
  const [dyslipidemia, setDyslipidemia] = useState<boolean>(false);
  const [hemodynamicChanges, setHemodynamicChanges] = useState<boolean>(false);
  const [prothromboticFactors, setProthromboticFactors] =
    useState<boolean>(false);
  const [markersOfInflammation, setMarkersOFInflammation] =
    useState<boolean>(false);
  const [endothelialDysfunction, setEndothelialDysfunction] =
    useState<boolean>(false);
  const [hypertriglyceridemia, setHypertriglyceridemia] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [fastingGlucose, setFastingGlucose] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [physicalActivity, setPhysicalActivity] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string>("");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
    if (arterialPressure.length === 0) {
      setErrorMessage("Arterial Pressure input is not valid!");
      return false;
    }
    if (triglycerideLevel.length === 0) {
      setErrorMessage("Plasma Triglyceride input is not valid!");
      return false;
    }
    if (waistCircumference.length === 0) {
      setErrorMessage("Waist Circumference input is not valid!");
      return false;
    }
    if (hipCircumference.length === 0) {
      setErrorMessage("Hip Circumference input is not valid!");
      return false;
    }
    if (albumin.length === 0) {
      setErrorMessage("Albumin input is not valid!");
      return false;
    }
    if (creatine.length === 0) {
      setErrorMessage("Creatine input is not valid!");
      return false;
    }
    if (plasmaInsulin.length === 0) {
      setErrorMessage("Plasma Insulin input is not valid!");
      return false;
    }
    if (hypertension.length === 0) {
      setErrorMessage("Hypertension input is not valid!");
      return false;
    }
    if (plasmaGlucose.length === 0) {
      setErrorMessage("Plasma Glucose input is not valid!");
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
    if (height.length === 0) {
      setErrorMessage("Height input is not valid!");
      return false;
    }
    if (age.length === 0) {
      setErrorMessage("Age input is not valid!");
      return false;
    }
    if (physicalActivity.length === 0) {
      setErrorMessage("You must chose one of the options for each question!");
      return false;
    }
    if (familyHistory.length === 0) {
      setErrorMessage("You must chose one of the options for each question!");
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
          <p>All Definitions</p>
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
          <div className={styles.glucoseIntoleranceContainer}>
            <p>Glucose Intolerance:</p>
            <Checkbox
              onChange={() => setGlucoseIntolerance(!glucoseIntolerance)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div className={styles.diabetesMellitusContainer}>
            <p>Diabetes Mellitus:</p>
            <Checkbox
              onChange={() => setDiabetesMellitus(!diabetesMellitus)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div className={styles.insulinResistanceContainer}>
            <p>Insulin Resistance:</p>
            <Checkbox
              onChange={() => setInsulinResistance(!insulinResistance)}
              className={styles.checkbox}
            ></Checkbox>
          </div>
          <div>
            <div className={styles.label}>Arterial Pressure:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setArterialPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Plasma Triglyceride Level:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTriglycerideLevel(e.target.value)
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
            <div className={styles.label}>Hip Circumference:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHipCircumference(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Albumin:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAlbumin(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Creatine:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCreatine(e.target.value)
              }
              className={styles.input}
            />
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
            <div className={styles.label}>Hypertension:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertension(e.target.value)
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
          <div className={styles.allCheckboxesContainer}>
            <div className={styles.checkboxContainer}>
              <p>Abnormal Uric Acid Metabolism:</p>
              <Checkbox
                onChange={() =>
                  setAbnormalUricAcidMetabolism(!abnormalUricAcidMetabolism)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Dyslipidemia:</p>
              <Checkbox
                onChange={() => setDyslipidemia(!dyslipidemia)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Hemodynamic Changes:</p>
              <Checkbox
                onChange={() => setHemodynamicChanges(!hemodynamicChanges)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Prothrombotic Factors:</p>
              <Checkbox
                onChange={() => setProthromboticFactors(!prothromboticFactors)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Markers Of Inflammation:</p>
              <Checkbox
                onChange={() =>
                  setMarkersOFInflammation(!markersOfInflammation)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Endothelial Dysfunction:</p>
              <Checkbox
                onChange={() =>
                  setEndothelialDysfunction(!endothelialDysfunction)
                }
                className={styles.checkbox}
              ></Checkbox>
            </div>
          </div>
          <div>
            <div className={styles.label}>Hypertriglyceridemia:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHypertriglyceridemia(e.target.value)
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
            <div className={styles.label}>Blood Pressure:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBloodPressure(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.label}>Fasting Glucose:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFastingGlucose(e.target.value)
              }
              className={styles.input}
            />
          </div>
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
            <div className={styles.label}>Age:</div>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAge(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <div className={styles.physicalActivityTitle}>Physical Activity:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) =>
                setPhysicalActivity(e.target.value)
              }
              className={styles.physicalActivityContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                Exercise regular + strenuous work
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
                Exercise regular or strenuous work
              </Radio>
              <Radio className={styles.ratio} value={"3"}>
                No exercise and sedentary work
              </Radio>
            </Radio.Group>
          </div>
          <div>
            <div className={styles.familyHistoryTitle}>Family history:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) =>
                setFamilyHistory(e.target.value)
              }
              className={styles.familyHistoryContainer}
            >
              <Radio className={styles.ratio} value={"1"}>
                No family history
              </Radio>
              <Radio className={styles.ratio} value={"2"}>
                Either parent
              </Radio>
              <Radio className={styles.ratio} value={"3"}>
                Both parents
              </Radio>
            </Radio.Group>
          </div>
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

export default WHODefinition;
