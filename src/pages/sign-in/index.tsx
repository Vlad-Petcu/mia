import { Button, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = () => {
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
    console.log('form submit');
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.pageTitle}>
          <h1>Register</h1>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.emailContainer}>
            <p className={styles.emailLabel}>Email:</p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.passwordContainer}>
            <p className={styles.passwordLabel}>Password:</p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              type={"password"}
            />
          </div>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <Button
            className={styles.submitButton}
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
