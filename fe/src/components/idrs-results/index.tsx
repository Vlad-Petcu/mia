import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Radio, RadioChangeEvent, Space } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
import { FC, useCallback, useEffect, useState } from "react";

type IDRSResponseT = {
  id: number;
  gender: string;
  age: number;
  waist_circumference: number;
  hdlc: number;
  physical_activity: number;
  family_history: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface IDRSResultsI {
  userId: number;
}

const IDRSResults: FC<IDRSResultsI> = ({ userId }) => {
  const [initialResults, setInitialResults] = useState<Array<IDRSResponseT>>();
  const [results, setResults] = useState<Array<IDRSResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const positiveResults = initialResults?.filter(
    (resultData: IDRSResponseT) => resultData.result === true
  );
  const negativeResults = initialResults?.filter(
    (resultData: IDRSResponseT) => resultData.result === false
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
      `http://localhost:3000/idrs/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getIDRSDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/idrs/${userId}`);
    setInitialResults(response.data);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getIDRSDefinitionResults();
  }, [getIDRSDefinitionResults, deletedResultId]);

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
                <p>{`Age: ${result.age}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <p>{`HDLC: ${result.hdlc}`}</p>
                <p>{`Physical Activity: ${result.physical_activity}`}</p>
                <p>{`Family History: ${result.family_history}`}</p>
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

export default IDRSResults;
