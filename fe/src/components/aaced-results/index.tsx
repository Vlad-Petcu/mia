import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Radio, RadioChangeEvent } from "antd";
import styles from "./index.module.scss";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";

type AACEDResponseT = {
  id: number;
  glucose_intolerance: boolean;
  abnormal_uric_acid_metabolism: boolean;
  dyslipidemia: boolean;
  hemodynamic_changes: boolean;
  prothrombotic_factors: boolean;
  markers_of_inflammation: boolean;
  endothelial_dysfunction: boolean;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface AACEDResultsI {
  userId: number;
}

const AACEDResults: FC<AACEDResultsI> = ({ userId }) => {
  const [initialResults, setInitialResults] = useState<Array<AACEDResponseT>>();
  const [results, setResults] = useState<Array<AACEDResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();
  const positiveResults = initialResults?.filter(
    (resultData: AACEDResponseT) => resultData.result === true
  );
  const negativeResults = initialResults?.filter(
    (resultData: AACEDResponseT) => resultData.result === false
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
      `http://localhost:3000/aaced/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getAACEDDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/aaced/${userId}`);
    setInitialResults(response.data);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getAACEDDefinitionResults();
  }, [getAACEDDefinitionResults, deletedResultId]);

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
                style={{ width: 300 }}
                extra={
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(result.id)}
                  />
                }
              >
                <p>{`Glucose Intolerance: ${result.glucose_intolerance}`}</p>
                <p>{`Abnormal Uric Acid Metabolism: ${result.abnormal_uric_acid_metabolism}`}</p>
                <p>{`Dyslipidemia: ${result.dyslipidemia}`}</p>
                <p>{`Hemodynamic Changes: ${result.hemodynamic_changes}`}</p>
                <p>{`Prothrombotic Factors: ${result.prothrombotic_factors}`}</p>
                <p>{`Markers Of Inflammation: ${result.markers_of_inflammation}`}</p>
                <p>{`Endothelial Dysfunction: ${result.endothelial_dysfunction}`}</p>
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

export default AACEDResults;
