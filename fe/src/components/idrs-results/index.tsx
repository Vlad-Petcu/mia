import { Card, Space } from "antd";
import axios from "axios";
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
  const [results, setResults] = useState<Array<IDRSResponseT>>();

  const getIDRSDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/idrs/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getIDRSDefinitionResults();
  }, [getIDRSDefinitionResults]);

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
                <p>{`Age: ${result.age}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <p>{`HDLC: ${result.hdlc}`}</p>
                <p>{`Physical Activity: ${result.physical_activity}`}</p>
                <p>{`Family History: ${result.family_history}`}</p>
                <p>
                  {result.result === true
                    ? "Result: Positive"
                    : "Result: Negative"}
                </p>
              </Card>
            </div>
          );
        })}
      </Space>
    </>
  );
};

export default IDRSResults;
