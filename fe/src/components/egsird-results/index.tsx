import { Card, Space } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";

type EGSIRDResponseT = {
  id: number;
  plasma_insulin: number;
  waist_circumference: number;
  systolic_tension: number;
  diastolic_tension: number;
  triglyceride_level: number;
  impaired_fasting_glucose: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface EGSIRDResultsI {
  userId: number;
}

const EGSIRDResults: FC<EGSIRDResultsI> = ({ userId }) => {
  const [results, setResults] = useState<Array<EGSIRDResponseT>>();

  const getEGSIRDDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/egsird/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getEGSIRDDefinitionResults();
  }, [getEGSIRDDefinitionResults]);

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
                <p>{`Plasma Insulin: ${result.plasma_insulin}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <p>{`Systolic_tension: ${result.systolic_tension}`}</p>
                <p>{`Diastolic Tension: ${result.diastolic_tension}`}</p>
                <p>{`Triglyceride Level: ${result.triglyceride_level}`}</p>
                <p>{`Impaired Fasting Glucose: ${result.impaired_fasting_glucose}`}</p>
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

export default EGSIRDResults;
