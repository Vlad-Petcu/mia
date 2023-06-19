import { Card, Space } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";

type NCEPATPIIIResponseT = {
  id: number;
  gender: string;
  waist_circumference: number;
  hypertriglyceridemia: number;
  hdlc: number;
  systolic_tension: number;
  diastolic_tension: number;
  fasting_glucose: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface NCEPATPIIIResultsI {
  userId: number;
}

const NCEPATPIIIResults: FC<NCEPATPIIIResultsI> = ({ userId }) => {
  const [results, setResults] = useState<Array<NCEPATPIIIResponseT>>();

  const getNCEPATPIIIDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/ncepatpiii/${userId}`);
    setResults(response.data);
  }, []);

  useEffect(() => {
    getNCEPATPIIIDefinitionResults();
  }, [getNCEPATPIIIDefinitionResults]);

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
                <p>{`Waist Circumference: ${result.waist_circumference}`}</p>
                <p>{`Hypertriglyceridemia: ${result.hypertriglyceridemia}`}</p>
                <p>{`HDLC: ${result.hdlc}`}</p>
                <p>{`Systolic Tension: ${result.systolic_tension}`}</p>
                <p>{`Diastolic Tension: ${result.diastolic_tension}`}</p>
                <p>{`Fasting Glucose: ${result.fasting_glucose}`}</p>
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

export default NCEPATPIIIResults;
