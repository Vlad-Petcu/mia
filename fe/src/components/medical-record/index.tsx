import { FC, useState } from "react";
import styles from "./index.module.scss";
import { Select } from "antd";
import AACEDResults from "../aaced-results";
import EGSIRDResults from "../egsird-results";
import IDFGCDResults from "../idfgcd-results";
import IDRSResults from "../idrs-results";
import LAPResults from "../lap-results";
import NCEPATPIIIResults from "../ncep-atp-iii-results";
import SDMSResults from "../sdms-results";
import WHOResults from "../who-results";

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

interface MedicalRecordI {
  patientId?: number;
}

const MedicalRecord: FC<MedicalRecordI> = ({ patientId }) => {
  const [definition, setDefinition] = useState<string>();
  const userId = patientId ? patientId : Number(localStorage.getItem("userId"));

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
      <div className={styles.contentContainer}>
        <div className={styles.selectDefinition}>
          <Select
            placeholder="Select Definition"
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
    </>
  );
};

export default MedicalRecord;
