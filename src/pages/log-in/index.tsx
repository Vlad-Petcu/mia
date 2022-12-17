import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const LogIn: FC = () => {
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
    isFormValid();
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <div>
          <h1 className={styles.pageTitle}>Login</h1>
        </div>
        <div className={styles.formContainer}>
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

export default LogIn;
