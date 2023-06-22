import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Radio, RadioChangeEvent, Space } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
import { FC, useCallback, useEffect, useState } from "react";

type IDFGCDResponseT = {
  id: number;
  gender: string;
  location: string;
  tryglycerides: number;
  hdlc: number;
  systolic_tension: number;
  diastolic_tension: number;
  fpg: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface IDFGCDResultsI {
  userId: number;
}

const IDFGCDResults: FC<IDFGCDResultsI> = ({ userId }) => {
  const [initialResults, setInitialResults] =
    useState<Array<IDFGCDResponseT>>();
  const [results, setResults] = useState<Array<IDFGCDResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const positiveResults = initialResults?.filter(
    (resultData: IDFGCDResponseT) => resultData.result === true
  );
  const negativeResults = initialResults?.filter(
    (resultData: IDFGCDResponseT) => resultData.result === false
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
      `http://localhost:3000/idfgcd/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getIDFGCDDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/idfgcd/${userId}`);
    setInitialResults(response.data);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getIDFGCDDefinitionResults();
  }, [getIDFGCDDefinitionResults, deletedResultId]);

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
                <p>{`Location: ${result.location}`}</p>
                <p>{`Triglyceride Level: ${result.tryglycerides}`}</p>
                <p>{`HDLC: ${result.hdlc}`}</p>
                <p>{`Systolic Tension: ${result.systolic_tension}`}</p>
                <p>{`Diastolic Tension: ${result.diastolic_tension}`}</p>
                <p>{`FPG: ${result.fpg}`}</p>
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

export default IDFGCDResults;
