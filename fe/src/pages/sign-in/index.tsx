import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const SignIn: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
    if (firstName.length === 0) {
      setErrorMessage("First Name is not valid!");
      return false;
    }
    if (lastName.length === 0) {
      setErrorMessage("Last Name is not valid!");
      return false;
    }
    if (gender.length === 0) {
      setErrorMessage("Gender is not valid!");
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

  const handleSubmit = async () => {
    isFormValid();
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
            <p>Gender:</p>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGender(e.target.value)
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
