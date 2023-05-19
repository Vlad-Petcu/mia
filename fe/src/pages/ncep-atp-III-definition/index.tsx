import { Button, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const NCEPATPIIIDefinition: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hypertriglyceridemia, setHypertriglyceridemia] = useState<string>("");
  const [HDLC, setHDLC] = useState<string>("");
  const [systolicTension, setSystolicTension] = useState<string>("");
  const [diastolicTension, setDiastolicTension] = useState<string>("");
  const [fastingGlucose, setFastingGlucose] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
      return false;
    }
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
    if (systolicTension.length === 0) {
      setErrorMessage("Systolic Tension input is not valid!");
      return false;
    }
    if (diastolicTension.length === 0) {
      setErrorMessage("Diastolic Tension input is not valid!");
      return false;
    }
    if (fastingGlucose.length === 0) {
      setErrorMessage("Fasting Glucose input is not valid!");
      return false;
    }
    return true;
  };

  const isPatientDiagnosed = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    let HDLCLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 102;
      HDLCLimit = 40;
    } else {
      waistCircumferenceLimit = 88;
      HDLCLimit = 50;
    }
    if (Number(hypertriglyceridemia) >= 150) {
      overLimitResultCounter++;
    }
    if (Number(HDLC) < 150) {
      overLimitResultCounter++;
    }
    if (Number(waistCircumference) > waistCircumferenceLimit) {
      overLimitResultCounter++;
    }
    if (Number(HDLC) < HDLCLimit) {
      overLimitResultCounter++;
    }
    if (Number(systolicTension) >= 130) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 85) {
      overLimitResultCounter++;
    }
    if (Number(fastingGlucose) > 110) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 3) {
      return true;
    } else {
      return false;
    }
  };

  const createNCEPATPIIIDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/ncepatpiii", {
      gender,
      waistCircumference,
      hypertriglyceridemia,
      HDLC,
      systolicTension,
      diastolicTension,
      fastingGlucose,
      result,
      userId,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    if (isPatientDiagnosed()) {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you may be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createNCEPATPIIIDefinition(true);
      }
    } else {
      setResultMessage(
        'According to the "WHO Definition" your results suggests that you are not in danger to be diagnosed with metabolic syndrome.'
      );
      if (userId) {
        createNCEPATPIIIDefinition(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>NCEP ATP III Definition</p>
        </div>
        <div className={styles.description}>
          <p>
            This definition differs from the WHO definition on several fronts.
            The NCEP ATP III did not believe that insulin resistance is
            mandatory for the development of MS and hence suggested the term MS
            instead of the previously used term insulin resistance syndrome.
            This definition recognizes central obesity as the culprit and hence
            body mass index (BMI,) which is a parameter for generalized obesity,
            has not been included in this definition. Central obesity has been
            quantified using WC instead of the WHR used by WHO. This definition
            considers low HDL and high triglycerides as separate components
            (both of them being individually atherogenic) rather than viewing
            dyslipidemia as a single component. The cutoff points used for BP
            and HDL are stringent as compared to those suggested in the WHO
            definition, but by avoiding the need for clamp techniques and
            measurement of microalbuminuria, the NCEP ATP III definition is much
            more practically applicable. The NCEP ATP III considers the
            proinflamatory state and prothrombotic state as components of MS
            though these have not been included among the criteria necessary to
            define MS.
          </p>
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
          <div>
            <div>Waist Circumference:</div>
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
            <div>Hypertriglyceridemia:</div>
            <Input
              value={hypertriglyceridemia}
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setHypertriglyceridemia(e.target.value);
              }}
              className={styles.input}
            />
          </div>
          <div>
            <div>HDLC:</div>
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
            <div>Fasting Glucose:</div>
            <Input
              value={fastingGlucose}
              placeholder="mg/dl"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setFastingGlucose(e.target.value);
              }}
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

export default NCEPATPIIIDefinition;
