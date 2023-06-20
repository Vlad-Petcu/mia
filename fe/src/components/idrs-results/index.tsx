import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
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
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const handleDeleteClick = async (resultId: number) => {
    const response = await axios.delete(
      `http://localhost:3000/idrs/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getIDRSDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/idrs/${userId}`);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getIDRSDefinitionResults();
  }, [getIDRSDefinitionResults, deletedResultId]);

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
      </Space>
    </>
  );
};

export default IDRSResults;
