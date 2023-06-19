import { Card, Space } from "antd";
import axios from "axios";
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
  const [results, setResults] = useState<Array<IDFGCDResponseT>>();

  const getIDFGCDDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/idfgcd/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getIDFGCDDefinitionResults();
  }, [getIDFGCDDefinitionResults]);

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
      </Space>
    </>
  );
};

export default IDFGCDResults;
