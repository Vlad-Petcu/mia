const LAPSchema = {
    type: "object",
    required: [
      "gender",
      "triglycerideLevel",
      "waistCircumference",
      "userId",
      "result",
    ],
    properties: {
      gender: {
        type: "string",
      },
      triglycerideLevel: {
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
      triglycerideLevel: 34,
      waistCircumference: 16,
      userId: 0,
      result: false,
    },
  };
  
  export default LAPSchema;
  