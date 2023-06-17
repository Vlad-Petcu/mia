import { FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import { Select } from "antd";
import AACEDResults from "../../components/aaced-results";
import EGSIRDResults from "../../components/egsird-results";
import IDFGCDResults from "../../components/idfgcd-results";
import IDRSResults from "../../components/idrs-results";
import LAPResults from "../../components/lap-results";
import NCEPATPIIIResults from "../../components/ncep-atp-iii-results";
import SDMSResults from "../../components/sdms-results";
import WHOResults from "../../components/who-results";

const options = [
  { label: "AACED", value: "AACED" },
  { label: "EGSIRD", value: "EGSIRD" },
  { label: "IDFGCD", value: "IDFGCD" },
  { label: "IDRS", value: "IDRS" },
  { label: "LAP", value: "LAP" },
  { label: "NCEPATPIII", value: "NCEPATPIII" },
  { label: "SDMS", value: "SDMS" },
  { label: "WHO", value: "WHO" },
];

const MyMedicalRecord: FC = () => {
  const [definition, setDefinition] = useState<string>();
  const userId = Number(localStorage.getItem("userId"));

  const handleChange = async (value: string) => {
    switch (value) {
      case "AACED":
        setDefinition("AACED");
        break;
      case "EGSIRD":
        setDefinition("EGSIRD");
        break;
      case "IDFGCD":
        setDefinition("IDFGCD");
        break;
      case "IDRS":
        setDefinition("IDRS");
        break;
      case "LAP":
        setDefinition("LAP");
        break;
      case "NCEPATPIII":
        setDefinition("NCEPATPIII");
        break;
      case "SDMS":
        setDefinition("SDMS");
        break;
      case "WHO":
        setDefinition("WHO");
        break;
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Medical Record</h1>
        <div className={styles.selectDefinition}>
          <Select
            defaultValue="Select Definition"
            style={{ width: 220 }}
            onChange={handleChange}
            options={options}
          />
        </div>
        {definition === "AACED" && <AACEDResults userId={userId} />}
        {definition === "EGSIRD" && <EGSIRDResults userId={userId} />}
        {definition === "IDFGCD" && <IDFGCDResults userId={userId} />}
        {definition === "IDRS" && <IDRSResults userId={userId} />}
        {definition === "LAP" && <LAPResults userId={userId} />}
        {definition === "NCEPATPIII" && <NCEPATPIIIResults userId={userId} />}
        {definition === "SDMS" && <SDMSResults userId={userId} />}
        {definition === "WHO" && <WHOResults userId={userId} />}
      </div>
      <Footer />
    </>
  );
};

export default MyMedicalRecord;
