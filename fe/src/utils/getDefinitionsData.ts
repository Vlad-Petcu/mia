import axios from "axios";

export const getAACEDDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/aaced/${userId}`);
  return response.data;
};

export const getEGSIRDDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/egsird/${userId}`);
  return response.data;
};

export const getIDFGCDDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/idfgcd/${userId}`);
  return response.data;
};

export const getIDRSDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/idrs/${userId}`);
  return response.data;
};

export const getLAPDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/idrs/${userId}`);
  return response.data;
};

export const getNCEPATPIIIDefinitionResults = async (userId: number) => {
  const response = await axios.get(
    `http://localhost:3000/ncepatpiii/${userId}`
  );
  return response.data;
};

export const getSDMSDefinitionResults = async (userId: number) => {
  const response = await axios.get(`http://localhost:3000/sdms/${userId}`);
  return response.data;
};

export const getWHODefinitionResults = async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/who/${userId}`);
    return response.data;
  };
