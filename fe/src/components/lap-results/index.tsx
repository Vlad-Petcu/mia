import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";

type LAPResponseT = {
  id: number;
  gender: string;
  triglyceride_level: string;
  waist_circumference: number;
  user_id: number;
  result: boolean;
  result_date: string;
};

interface LAPResultsI {
  userId: number;
}

const LAPResults: FC<LAPResultsI> = ({ userId }) => {
  const [results, setResults] = useState<Array<LAPResponseT>>();
  const [deletedResultId, setDeletedResultId] = useState<number>();

  const handleDeleteClick = async (resultId: number) => {
    const response = await axios.delete(
      `http://localhost:3000/lap/${resultId}`
    );
    setDeletedResultId(response.data);
  };

  const getLAPDefinitionResults = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/lap/${userId}`);
    setResults(response.data);
  }, [deletedResultId]);

  useEffect(() => {
    getLAPDefinitionResults();
  }, [getLAPDefinitionResults, deletedResultId]);

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
                <p>{`Triglyceride Level: ${result.triglyceride_level}`}</p>
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

export default LAPResults;
