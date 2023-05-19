import { Button, Input, Radio, RadioChangeEvent, Select } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type SelectOption = {
  value: string | number;
  label: string | number;
};

export type User = {
  id: number;
  is_doctor: boolean;
  doctor_id: number;
  gender: string;
  first_name: string;
  last_name: string;
  email: string;
};

const SignIn: FC = () => {
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<number>();
  const [gender, setGender] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [doctorUsersOptions, setDoctorUsersOptions] =
    useState<Array<SelectOption>>();
  const navigate = useNavigate();

  const isFormValid = () => {
    if (firstName.length === 0) {
      setErrorMessage("First Name is not valid!");
      return false;
    }
    if (lastName.length === 0) {
      setErrorMessage("Last Name is not valid!");
      return false;
    }
    if (email.length === 0 && !email.includes("@")) {
      setErrorMessage("Email is not valid!");
      return false;
    }
    if (email.length === 0 || !email.includes("@")) {
      setErrorMessage("Email is not valid!");
      return false;
    }
    if (password.length === 0) {
      setErrorMessage("Password is not valid!");
      return false;
    }
    return true;
  };

  const createNewUser = async () => {
    const response = await axios.post("http://localhost:3000/register", {
      isDoctor,
      doctorId: isDoctor ? null : doctorId,
      gender,
      firstName,
      lastName,
      email,
      password,
    });
    if (response.status === 201) {
        navigate("/log-in");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    createNewUser();
  };

  const getAllDoctorUsers = async () => {
    const response = await axios.get("http://localhost:3000/user/doctors");
    const doctorUsers: Array<User> = response.data;
    const responseDoctorUsersOptions: Array<SelectOption> = doctorUsers.map(
      (doctorUser) => {
        const optionUser: SelectOption = {
          value: doctorUser.id,
          label: `${doctorUser.first_name} ${doctorUser.last_name}`,
        };
        return optionUser;
      }
    );
    setDoctorUsersOptions(responseDoctorUsersOptions);
  };

  useEffect(() => {
    getAllDoctorUsers();
  }, []);

  const handleSelectDoctorUserChange = (value: number) => {
    setDoctorId(value);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <p>Register</p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.ratio}>
            <div>Type of account:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setIsDoctor(e.target.value)}
              className={styles.firstRatioContainer}
              defaultValue={false}
            >
              <Radio className={styles.ratio} value={false}>
                Patient
              </Radio>
              <Radio className={styles.ratio} value={true}>
                Doctor
              </Radio>
            </Radio.Group>
          </div>
          <div className={styles.ratio}>
            <div>Gender:</div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => setGender(e.target.value)}
              className={styles.secondRatioContainer}
            >
              <Radio className={styles.ratio} value={"Male"}>
                Male
              </Radio>
              <Radio className={styles.ratio} value={"Female"}>
                Female
              </Radio>
            </Radio.Group>
          </div>
          {!isDoctor && (
            <div className={styles.select}>
              <p>Select doctor:</p>
              <Select
                placeholder="Doctor Name"
                onChange={handleSelectDoctorUserChange}
                className={styles.input}
                options={doctorUsersOptions}
              />
            </div>
          )}
          <div>
            <p>First Name:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Last Name:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Email:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className={styles.input}
            />
          </div>
          <div>
            <p>Password:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              className={styles.input}
              type={"password"}
            />
          </div>
          <div>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <Button
              className={styles.submitButton}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
