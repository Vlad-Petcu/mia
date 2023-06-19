import { Card, Space } from "antd";
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
  const [results, setResults] = useState<Array<AACEDResponseT>>();

  const getAACEDDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/aaced/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getAACEDDefinitionResults();
  }, [getAACEDDefinitionResults]);

  return (
    <>
      <Space direction="horizontal" size={16}>
        {results?.map((result) => {
          return (
            <div key={result.id}>
              <Card
                title={new Date(result.result_date).toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                style={{ width: 300 }}
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
      </Space>
    </>
  );
};

export default AACEDResults;
