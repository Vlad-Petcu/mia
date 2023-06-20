import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Radio, RadioChangeEvent, Space } from "antd";
import axios from "axios";
import styles from "./index.module.scss";
import { FC, useCallback, useEffect, useState } from "react";

type SDMSResponseT = {
  id: number;
  height: number;
  waist_circumference: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface SDMSResultsI {
  userId: number;
}

const SDMSResults: FC<SDMSResultsI> = ({ userId }) => {
  const [initialResults, setInitialResults] = useState<Array<SDMSResponseT>>();
  const [results, setResults] = useState<Array<SDMSResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const positiveResults = initialResults?.filter(
    (resultData: SDMSResponseT) => resultData.result === true
  );
  const negativeResults = initialResults?.filter(
    (resultData: SDMSResponseT) => resultData.result === false
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
      `http://localhost:3000/sdms/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getSDMSDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/sdms/${userId}`);
    setInitialResults(response.data);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getSDMSDefinitionResults();
  }, [getSDMSDefinitionResults, deletedResultId]);

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
      <Space direction="horizontal" size={16}>
        {results?.map((result) => {
          return (
            <div key={result.id}>
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
                <p>{`Height: ${result.height}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <strong>
                  {result.result === true
                    ? "Result: Positive"
                    : "Result: Negative"}
                </strong>
              </Card>
            </div>
          );
        })}
      </Space>
    </>
  );
};

export default SDMSResults;
