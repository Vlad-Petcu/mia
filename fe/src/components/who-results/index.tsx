import { Card, Space } from "antd";
import axios from "axios";
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
  const [results, setResults] = useState<Array<WHOResponseT>>();

  const getWHODefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/who/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getWHODefinitionResults();
  }, [getWHODefinitionResults]);

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
      </Space>
    </>
  );
};

export default WHOResults;
