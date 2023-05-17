const SDMSSchema = {
    type: "object",
    required: [
      "gender",
      "height",
      "waistCircumference",
      "userId",
      "result",
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
    },
    example: {
      gender: "Male",
      height: 172,
      waistCircumference: 16,
      userId: 0,
      result: false,
    },
  };
  
  export default SDMSSchema;
  