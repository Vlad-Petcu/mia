const LAPSchema = {
    type: "object",
    required: [
      "gender",
      "triglycerideLevel",
      "waistCircumference",
      "userId",
      "result",
      "resultDate",
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
      resultDate: {
        type: "string",
      },
    },
    example: {
      gender: "Male",
      triglycerideLevel: 34,
      waistCircumference: 16,
      userId: 0,
      result: false,
      resultDate: "2023-06-01 16:03:35.284+03",
    },
  };
  
  export default LAPSchema;
  