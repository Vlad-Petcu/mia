import { Button, Input } from "antd";
import { ChangeEvent, FC, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const LogIn: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

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

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      const user: any = jwt_decode(response.data.accessToken);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("isDoctor", user.isDoctor);
      navigate("/");
    } catch (e: any) {
      setErrorMessage(e.response.data.error);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    loginUser();
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
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <div>
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
