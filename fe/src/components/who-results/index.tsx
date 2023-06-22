import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Radio, RadioChangeEvent, Space } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
import { FC, useCallback, useEffect, useState } from "react";

type WHOResponseT = {
  id: number;
  gender: string;
  diabetes_mellitus: number;
  insulin_resistance: number;
  systolic_tension: number;
  diastolic_tension: number;
  triglyceride_level: number;
  waist_circumference: number;
  hip_circumference: number;
  albumin: number;
  creatine: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface WHOResultsI {
  userId: number;
}

const WHOResults: FC<WHOResultsI> = ({ userId }) => {
  const [initialResults, setInitialResults] = useState<Array<WHOResponseT>>();
  const [results, setResults] = useState<Array<WHOResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const positiveResults = initialResults?.filter(
    (resultData: WHOResponseT) => resultData.result === true
  );
  const negativeResults = initialResults?.filter(
    (resultData: WHOResponseT) => resultData.result === false
  );

  const oldestSort = results
    ?.slice()
    .sort(
      (a, b) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
  const newestSort = results
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.result_date).getTime() - new Date(a.result_date).getTime()
    );

  const handleDeleteClick = async (resultId: number) => {
    const response = await axios.delete(
      `http://localhost:3000/who/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getWHODefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/who/${userId}`);
    setInitialResults(response.data);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getWHODefinitionResults();
  }, [getWHODefinitionResults, deletedResultId]);

  return (
    <>
      <div className={styles.radio}>
        <div>Select the type of result:</div>
        <Radio.Group
          onChange={(e: RadioChangeEvent) =>
            setResults(
              e.target.value === "Positive"
                ? positiveResults
                : e.target.value === "Negative"
                ? negativeResults
                : initialResults
            )
          }
          className={styles.radioContainer}
        >
          <Radio value={"All"}>All</Radio>
          <Radio value={"Positive"}>Positive</Radio>
          <Radio value={"Negative"}>Negative</Radio>
        </Radio.Group>
      </div>
      <div className={styles.radio}>
        <div>Sort result base on date:</div>
        <Radio.Group
          onChange={(e: RadioChangeEvent) =>
            setResults(e.target.value === "Oldest" ? oldestSort : newestSort)
          }
          className={styles.radioContainer}
        >
          <Radio value={"Oldest"}>Oldest</Radio>
          <Radio value={"Newest"}>Newest</Radio>
        </Radio.Group>
      </div>
      <div className={styles.resultsContainer}>
        {results?.map((result) => {
          return (
            <div className={styles.card} key={result.id}>
              <Card
                title={new Date(result.result_date).toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                extra={
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(result.id)}
                  />
                }
                style={{ width: 300 }}
              >
                <p>{`Gender: ${result.gender}`}</p>
                <p>{`Diabetes Mellitus: ${result.diabetes_mellitus}`}</p>
                <p>{`Insulin Resistance: ${result.insulin_resistance}`}</p>
                <p>{`Systolic Tension: ${result.systolic_tension}`}</p>
                <p>{`Diastolic Tension: ${result.diastolic_tension}`}</p>
                <p>{`Triglyceride Level: ${result.triglyceride_level}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <p>{`Hip Circumference: ${result.hip_circumference}`}</p>
                <p>{`Albumin: ${result.albumin}`}</p>
                <p>{`Creatine: ${result.creatine}`}</p>
                <strong>
                  {result.result === true
                    ? "Result: Positive"
                    : "Result: Negative"}
                </strong>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WHOResults;
