const SDMSSchema = {
    type: "object",
    required: [
      "gender",
      "height",
      "waistCircumference",
      "userId",
      "result",
      "resultDate",
    ],
    properties: {
      gender: {
        type: "string",
      },
      height: {
        type: "integer",
      },
      waistCircumference: {
        type: "integer",
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
      height: 172,
      waistCircumference: 16,
      userId: 0,
      result: false,
      resultDate: "2023-06-01 16:03:35.284+03",
    },
  };
  
  export default SDMSSchema;
  