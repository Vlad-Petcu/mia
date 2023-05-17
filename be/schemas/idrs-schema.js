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
    },
    example: {
      gender: "Male",
      age: 34,
      waistCircumference: 16,
      physicalActivity: "1",
      familyHistory: "2",
      userId: 0,
      result: false,
    },
  };
  
  export default IDRSSchema;
  