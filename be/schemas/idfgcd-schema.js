const IDFGCDSchema = {
    type: "object",
    required: [
      "gender",
      "location",
      "waistCircumference",
      "tryglycerides",
      "HDLC",
      "systolicTension",
      "diastolicTension",
      "FPG",
      "userId",
      "result",
      "resultDate",
    ],
    properties: {
      gender: {
        type: "string",
      },
      location: {
        type: "string",
      },
      waistCircumference: {
        type: "integer",
      },
      triglycerides: {
        type: "integer",
      },
      HDLC: {
        type: "integer",
      },
      systolicTension: {
        type: "integer",
      },
      diastolicTension: {
        type: "integer",
      },
      FPG: {
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
      location: "USA",
      waistCircumference: 16,
      triglycerides: 145,
      HDLC: 160,
      systolicTension: 130,
      diastolicTension: 80,
      FPG: 80,
      userId: 0,
      result: false,
      resultDate: "2023-06-01 16:03:35.284+03",
    },
  };
  
  export default IDFGCDSchema;
  