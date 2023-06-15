const NCEPATPIIISchema = {
  type: "object",
  required: [
    "gender",
    "waistCircumference",
    "hypertriglyceridemia",
    "HDLC",
    "systolicTension",
    "diastolicTension",
    "fastingGlucose",
    "userId",
    "result",
    "resultDate",
  ],
  properties: {
    gender: {
      type: "string",
    },
    waistCircumference: {
      type: "integer",
    },
    hypertriglyceridemia: {
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
    fastingGlucose: {
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
    waistCircumference: 16,
    systolicTension: 130,
    diastolicTension: 80,
    hypertriglyceridemia: 145,
    HDLC: 80,
    fastingGlucose: 12,
    userId: 0,
    result: false,
    resultDate: "2023-06-01 16:03:35.284+03",
  },
};

export default NCEPATPIIISchema;
