import { Card, Space } from "antd";
import axios from "axios";
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
  const [results, setResults] = useState<Array<SDMSResponseT>>();

  const getLAPDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/lap/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getLAPDefinitionResults();
  }, [getLAPDefinitionResults]);

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
                <p>{`Height: ${result.height}`}</p>
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
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

export default SDMSResults;
