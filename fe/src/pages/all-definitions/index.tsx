import { Button, Checkbox, Input, Radio, RadioChangeEvent } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";

const AllDefinitions: FC = () => {
  const [gender, setGender] = useState<string>("");
  const [glucoseIntolerance, setGlucoseIntolerance] = useState<boolean>(false);
  const [diabetesMellitus, setDiabetesMellitus] = useState<boolean>(false);
  const [insulinResistance, setInsulinResistance] = useState<boolean>(false);
  const [systolicTension, setSystolicTension] = useState<string>("");
  const [diastolicTension, setDiastolicTension] = useState<string>("");
  const [triglycerideLevel, setTriglycerideLevel] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");
  const [hipCircumference, setHipCircumference] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatine, setCreatine] = useState<string>("");
  const [plasmaInsulin, setPlasmaInsulin] = useState<string>("");
  const [impairedFastingGlucose, setImpairedFastingGlucose] =
    useState<boolean>(false);
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
  const [fastingGlucose, setFastingGlucose] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [physicalActivity, setPhysicalActivity] = useState<string>("");
  const [familyHistory, setFamilyHistory] = useState<string>("");
  const [FPG, setFPG] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [resultMessageAACED, setResultMessageAACED] = useState<string>("");
  const [resultMessageEGSIRD, setResultMessageEGSIRD] = useState<string>("");
  const [resultMessageIDFGCD, setResultMessageIDFGCD] = useState<string>("");
  const [resultMessageIDRS, setResultMessageIDRS] = useState<string>("");
  const [resultMessageLAP, setResultMessageLAP] = useState<string>("");
  const [resultMessageNCEPATPIII, setResultMessageNCEPATPIII] =
    useState<string>("");
  const [resultMessageSDMS, setResultMessageSDMS] = useState<string>("");
  const [resultMessageWHO, setResultMessageWHO] = useState<string>("");

  const userId = localStorage.getItem("userId");

  const isFormValid = () => {
    if (gender.length === 0) {
      setErrorMessage("You must chose one gender!");
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
    if (hypertriglyceridemia.length === 0) {
      setErrorMessage("Hypertriglyceridemia input is not valid!");
      return false;
    }
    if (HDLC.length === 0) {
      setErrorMessage("HDLC input is not valid!");
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
    if (FPG.length === 0) {
      setErrorMessage("FPG input is not valid!");
      return false;
    }
    if (location.length === 0) {
      setErrorMessage("Location input is not valid!");
      return false;
    }
    return true;
  };

  const isPatientDiagnosedForAACED = () => {
    let overLimitResultCounter = 0;
    if (glucoseIntolerance) {
      overLimitResultCounter++;
    }
    if (abnormalUricAcidMetabolism) {
      overLimitResultCounter++;
    }
    if (dyslipidemia) {
      overLimitResultCounter++;
    }
    if (hemodynamicChanges) {
      overLimitResultCounter++;
    }
    if (prothromboticFactors) {
      overLimitResultCounter++;
    }
    if (markersOfInflammation) {
      overLimitResultCounter++;
    }
    if (endothelialDysfunction) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter === 7) {
      return true;
    } else {
      return false;
    }
  };

  const isPatientDiagnosedForEGSIRD = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 94;
    } else {
      waistCircumferenceLimit = 80;
    }
    if (Number(plasmaInsulin) <= 75) {
      return false;
    }
    if (Number(waistCircumference) >= waistCircumferenceLimit) {
      overLimitResultCounter++;
    }
    if (Number(systolicTension) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 90) {
      overLimitResultCounter++;
    }
    if (Number(triglycerideLevel) >= 150) {
      overLimitResultCounter++;
    }
    if (impairedFastingGlucose) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 2) {
      return true;
    } else {
      return false;
    }
  };

  const isPatientDiagnosedForIDFGCD = () => {
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
    if (Number(triglycerideLevel) >= 150) {
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

  const isPatientDiagnosedForIDRS = () => {
    let totalScore = 0;
    if (Number(age) >= 35 && Number(age) <= 49) {
      totalScore = totalScore + 20;
    }
    if (Number(age) >= 50) {
      totalScore = totalScore + 30;
    }
    if (
      gender === "Female" &&
      Number(waistCircumference) >= 80 &&
      Number(waistCircumference) <= 89
    ) {
      totalScore = totalScore + 10;
    }
    if (gender === "Female" && Number(waistCircumference) >= 90) {
      totalScore = totalScore + 20;
    }
    if (
      gender === "Male" &&
      Number(waistCircumference) >= 90 &&
      Number(waistCircumference) <= 99
    ) {
      totalScore = totalScore + 10;
    }
    if (gender === "Male" && Number(waistCircumference) >= 100) {
      totalScore = totalScore + 20;
    }
    if (physicalActivity === "2") {
      totalScore = totalScore + 20;
    }
    if (physicalActivity === "3") {
      totalScore = totalScore + 30;
    }
    if (familyHistory === "2") {
      totalScore = totalScore + 10;
    }
    if (familyHistory === "3") {
      totalScore = totalScore + 20;
    }
    if (totalScore >= 60) {
      return true;
    } else {
      return false;
    }
  };

  const isPatientDiagnosedForLAP = () => {
    let overLimit = false;
    if (
      gender === "Male" &&
      (Number(waistCircumference) - 65) * Number(triglycerideLevel) > 60
    ) {
      overLimit = true;
    }
    if (
      gender === "Female" &&
      (Number(waistCircumference) - 65) * Number(triglycerideLevel) > 32
    ) {
      overLimit = true;
    }
    return overLimit;
  };

  const isPatientDiagnosedForNCEPATPIII = () => {
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

  const isPatientDiagnosedForSDMS = () => {
    if (Number(height) / Number(waistCircumference) > 0.5) {
      return true;
    } else {
      return false;
    }
  };

  const isPatientDiagnosedForWHO = () => {
    let overLimitResultCounter = 0;
    let waistCircumferenceLimit;
    if (gender === "Male") {
      waistCircumferenceLimit = 0.9;
    } else {
      waistCircumferenceLimit = 0.85;
    }
    if (
      glucoseIntolerance === false &&
      diabetesMellitus === false &&
      insulinResistance === false
    ) {
      return false;
    }
    if (Number(systolicTension) >= 140) {
      overLimitResultCounter++;
    }
    if (Number(diastolicTension) >= 90) {
      overLimitResultCounter++;
    }
    if (Number(triglycerideLevel) >= 150) {
      overLimitResultCounter++;
    }
    if (
      Number(waistCircumference) / Number(hipCircumference) >=
      waistCircumferenceLimit
    ) {
      overLimitResultCounter++;
    }
    if (Number(albumin) / Number(creatine) >= 30) {
      overLimitResultCounter++;
    }
    if (overLimitResultCounter >= 2) {
      return true;
    } else {
      return false;
    }
  };

  const createAACEDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/aaced", {
      glucoseIntolerance,
      abnormalUricAcidMetabolism,
      dyslipidemia,
      hemodynamicChanges,
      prothromboticFactors,
      markersOfInflammation,
      endothelialDysfunction,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const createEGSIRDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/egsird", {
      gender,
      plasmaInsulin,
      waistCircumference,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      impairedFastingGlucose,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const createIDFGCDDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/idfgcd", {
      gender,
      location,
      tryglycerides: triglycerideLevel,
      HDLC,
      systolicTension,
      diastolicTension,
      FPG,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const createIDRSDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/idrs", {
      gender,
      age,
      waistCircumference,
      physicalActivity,
      familyHistory,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const createLAPDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/lap", {
      gender,
      triglycerideLevel,
      waistCircumference,
      result,
      resultDate: new Date(),
      userId,
    });
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
      resultDate: new Date(),
      userId,
    });
  };

  const createSDMSDefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/sdms", {
      height,
      waistCircumference,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const createWHODefinition = async (result: boolean) => {
    await axios.post("http://localhost:3000/who", {
      gender,
      glucoseIntolerance,
      diabetesMellitus,
      insulinResistance,
      systolicTension,
      diastolicTension,
      triglycerideLevel,
      waistCircumference,
      hipCircumference,
      albumin,
      creatine,
      result,
      resultDate: new Date(),
      userId,
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    if (isPatientDiagnosedForAACED()) {
      setResultMessageAACED("AACED Definition - Positive.");
      if (userId) {
        createAACEDDefinition(true);
      }
    } else {
      setResultMessageAACED("AACED Definition - Negative");
      if (userId) {
        createAACEDDefinition(false);
      }
    }
    if (isPatientDiagnosedForEGSIRD()) {
      setResultMessageEGSIRD("EGSIRD Definition - Positive");
      if (userId) {
        createEGSIRDDefinition(true);
      }
    } else {
      setResultMessageEGSIRD("EGSIRD Definition - Negative");
      if (userId) {
        createEGSIRDDefinition(false);
      }
    }
    if (isPatientDiagnosedForIDFGCD()) {
      setResultMessageIDFGCD("IDFGCD Definition - Positive");
      if (userId) {
        createIDFGCDDefinition(true);
      }
    } else {
      setResultMessageIDFGCD("IDFGCD Definition - Negative");
      if (userId) {
        createIDFGCDDefinition(false);
      }
    }
    if (isPatientDiagnosedForIDRS()) {
      setResultMessageIDRS("IDRS Definition - Positive");
      if (userId) {
        createIDRSDefinition(true);
      }
    } else {
      setResultMessageIDRS("IDRS Definition - Negative");
      if (userId) {
        createIDRSDefinition(false);
      }
    }
    if (isPatientDiagnosedForLAP()) {
      setResultMessageLAP("LAP Definition - Positive");
      if (userId) {
        createLAPDefinition(true);
      }
    } else {
      setResultMessageLAP("LAP Definition - Negative");
      if (userId) {
        createLAPDefinition(false);
      }
    }
    if (isPatientDiagnosedForNCEPATPIII()) {
      setResultMessageNCEPATPIII("NCEPATPIII Definition - Positive");
      if (userId) {
        createNCEPATPIIIDefinition(true);
      }
    } else {
      setResultMessageNCEPATPIII("NCEPATPIII Definition - Negative");
      if (userId) {
        createNCEPATPIIIDefinition(false);
      }
    }
    if (isPatientDiagnosedForSDMS()) {
      setResultMessageSDMS("SDMS Definition - Positive");
      if (userId) {
        createSDMSDefinition(true);
      }
    } else {
      setResultMessageSDMS("SDMS Definition - Negative");
      if (userId) {
        createSDMSDefinition(false);
      }
    }
    if (isPatientDiagnosedForWHO()) {
      setResultMessageWHO("WHO Definition - Positive");
      if (userId) {
        createWHODefinition(true);
      }
    } else {
      setResultMessageWHO("WHO Definition - Negative");
      if (userId) {
        createWHODefinition(false);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>All Definitions</p>
        </div>
        <div className={styles.sectionsContainer}>
          <div>
            <div className={styles.radioTitle}>Gender:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
              className={styles.rowRadioContainer}
            >
              <Radio value={"Male"}>Male</Radio>
              <Radio value={"Female"}>Female</Radio>
            </Radio.Group>
            <div className={styles.radioTitle}>Location:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setLocation(e.target.value)}
              className={styles.rowRadioContainer}
            >
              <Radio value={"Europe"}>Europe</Radio>
              <Radio value={"Rest of the world"}>Rest of the world</Radio>
            </Radio.Group>
            <div>
              <div className={styles.radioTitle}>Family history:</div>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setFamilyHistory(e.target.value)
                }
                className={styles.columnCheckboxContainer}
              >
                <Radio value={"1"}>No family history</Radio>
                <Radio value={"2"}>Either parent</Radio>
                <Radio value={"3"}>Both parents</Radio>
              </Radio.Group>
            </div>
            <div>
              <div className={styles.radioTitle}>Physical Activity:</div>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setPhysicalActivity(e.target.value)
                }
                className={styles.columnCheckboxContainer}
              >
                <Radio value={"1"}>Exercise regular + strenuous work</Radio>
                <Radio value={"2"}>Exercise regular or strenuous work</Radio>
                <Radio value={"3"}>No exercise and sedentary work</Radio>
              </Radio.Group>
            </div>
          </div>
          <div>
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
              <div className={styles.label}>Triglyceride Level:</div>
              <Input
                value={triglycerideLevel}
                placeholder="mg/dl"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setTriglycerideLevel(e.target.value);
                }}
                className={styles.input}
              />
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
              <div className={styles.label}>Hip Circumference:</div>
              <Input
                value={hipCircumference}
                placeholder="cm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setHipCircumference(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <div>
              <div className={styles.label}>Albumin:</div>
              <Input
                value={albumin}
                placeholder="μgm/minute"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setAlbumin(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Creatine:</div>
              <Input
                value={creatine}
                placeholder="μgm/mg"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setCreatine(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Plasma Insulin:</div>
              <Input
                value={plasmaInsulin}
                placeholder="k-th percentile"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setPlasmaInsulin(e.target.value);
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
          </div>
          <div>
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
            <div>
              <div className={styles.label}>Height:</div>
              <Input
                value={height}
                placeholder="cm"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setHeight(e.target.value);
                }}
                className={styles.input}
              />
            </div>
            <div>
              <div className={styles.label}>Age:</div>
              <Input
                value={age}
                placeholder="year"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                  setAge(e.target.value);
                }}
                className={styles.input}
              />
            </div>
          </div>
          <div>
            <div className={styles.allCheckboxesContainer}>
              <div className={styles.checkboxContainer}>
                <p>Impaired Plasma Glucose:</p>
                <Checkbox
                  onChange={() =>
                    setImpairedFastingGlucose(!impairedFastingGlucose)
                  }
                  className={styles.checkbox}
                ></Checkbox>
              </div>
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
                  onChange={() =>
                    setProthromboticFactors(!prothromboticFactors)
                  }
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
            </div>
            <div>
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
            <div className={styles.checkboxContainer}>
              <p>Glucose Intolerance:</p>
              <Checkbox
                onChange={() => setGlucoseIntolerance(!glucoseIntolerance)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Diabetes Mellitus:</p>
              <Checkbox
                onChange={() => setDiabetesMellitus(!diabetesMellitus)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
            <div className={styles.checkboxContainer}>
              <p>Insulin Resistance:</p>
              <Checkbox
                onChange={() => setInsulinResistance(!insulinResistance)}
                className={styles.checkbox}
              ></Checkbox>
            </div>
          </div>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.resultContainer}>
          <div>
            {resultMessageAACED && (
              <div className={styles.resultMessage}>{resultMessageAACED}</div>
            )}
            {resultMessageEGSIRD && (
              <div className={styles.resultMessage}>{resultMessageEGSIRD}</div>
            )}
            {resultMessageIDFGCD && (
              <div className={styles.resultMessage}>{resultMessageIDFGCD}</div>
            )}
            {resultMessageIDRS && (
              <div className={styles.resultMessage}>{resultMessageIDRS}</div>
            )}
          </div>
          <div>
            {resultMessageLAP && (
              <div className={styles.resultMessage}>{resultMessageLAP}</div>
            )}
            {resultMessageNCEPATPIII && (
              <div className={styles.resultMessage}>
                {resultMessageNCEPATPIII}
              </div>
            )}
            {resultMessageSDMS && (
              <div className={styles.resultMessage}>{resultMessageSDMS}</div>
            )}
            {resultMessageWHO && (
              <div className={styles.resultMessage}>{resultMessageWHO}</div>
            )}
          </div>
        </div>
        <Button className={styles.submitButton} onClick={() => handleSubmit()}>
          Apply
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default AllDefinitions;
