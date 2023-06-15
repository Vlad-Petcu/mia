const IDRSSchema = {
    type: "object",
    required: [
      "gender",
      "age",
      "waistCircumference",
      "physicalActivity",
      "familyHistory",
      "userId",
      "result",
      "resultDate"
    ],
    properties: {
      gender: {
        type: "string",
      },
      age: {
        type: "integer",
      },
      waistCircumference: {
        type: "integer",
      },
      physicalActivity: {
        type: "string",
      },
      familyHistory: {
        type: "string",
      },
      userId: {
        type: "integer",
      },
      result: {
        type: "boolean",
      },
      resultDate: {
        type: "string",
      },
    },
    example: {
      gender: "Male",
      age: 34,
      waistCircumference: 16,
      physicalActivity: "1",
      familyHistory: "2",
      userId: 0,
      result: false,
      resultDate: "2023-06-01 16:03:35.284+03",
    },
  };
  
  export default IDRSSchema;
  