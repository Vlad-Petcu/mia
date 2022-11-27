import { FC } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";

const IDFGCDDefinition: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>IDFGCD Definition</h1>
      </div>
      <Footer />
    </>
  );
};

export default IDFGCDDefinition;
