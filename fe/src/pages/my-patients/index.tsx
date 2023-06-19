import { FC, useCallback, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import { Select } from "antd";
import axios from "axios";
import MedicalRecord from "../../components/medical-record";

type Option = {
  value: number;
  label: string;
};

type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  doctor_id: number;
  is_doctor: boolean;
};

const MyPatients: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [options, setOptions] = useState<Array<Option>>();
  const userId = Number(localStorage.getItem("userId"));

  const getAllPatientsForCurrentDoctor = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/user/patients/${userId}`
    );
    const patientForCurrentDoctor: Array<Option> = response.data.map(
      (patient: Patient) => {
        const optionUser: Option = {
          value: patient.id,
          label: `${patient.first_name} ${patient.last_name}`,
        };
        return optionUser;
      }
    );
    setOptions(patientForCurrentDoctor);
  }, []);

  useEffect(() => {
    getAllPatientsForCurrentDoctor();
  }, [selectedUserId, getAllPatientsForCurrentDoctor]);

  const handleChange = async (value: number) => {
    setSelectedUserId(value);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>My Patients</h1>
        <div className={styles.selectDefinition}>
          <Select
            placeholder="Select Patient"
            style={{ width: 220 }}
            onChange={handleChange}
            options={options}
          />
        </div>
        {selectedUserId && <MedicalRecord patientId={selectedUserId} />}
      </div>
      <Footer />
    </>
  );
};

export default MyPatients;
