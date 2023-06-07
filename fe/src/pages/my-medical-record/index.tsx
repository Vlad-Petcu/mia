import { FC } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import styles from "./index.module.scss";
import { Card, Space } from "antd";

const MyMedicalRecord: FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>My Medical Record</h1>
        <Space direction="horizontal" size={16}>
          <Card
            title="WHO Definition"
            extra={<p>03.06.2023</p>}
            style={{ width: 300 }}
          >
            <p>Systolic Tension: 125</p>
            <p>Diastolic Tension: 85</p>
            <p>Triglyceride Level: 150</p>
            <p>Result: false</p>
          </Card>
          <Card
            title="LAP Definition"
            extra={<p>01.06.2023</p>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="SDMS Definition"
            extra={<p>30.05.2023</p>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="AACED Definition"
            extra={<p>21.04.2023</p>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card
            title="SDMS Definition"
            extra={<p>02.03.2023</p>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
      <Footer />
    </>
  );
};

export default MyMedicalRecord;
