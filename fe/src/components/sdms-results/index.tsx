import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
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
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const handleDeleteClick = async (resultId: number) => {
    const response = await axios.delete(
      `http://localhost:3000/sdms/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getSDMSDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/sdms/${userId}`);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getSDMSDefinitionResults();
  }, [getSDMSDefinitionResults, deletedResultId]);

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
