const WHOSchema = {
  type: "object",
  required: [
    "gender",
    "glucoseIntolerance",
    "diabetesMellitus",
    "insulinResistance",
    "systolicTension",
    "diastolicTension",
    "triglycerideLevel",
    "waistCircumference",
    "hipCircumference",
    "albumin",
    "creatine",
    "userId",
    "result",
    "resultDate"
  ],
  properties: {
    gender: {
      type: "string",
    },
    glucoseIntolerance: {
      type: "boolean",
    },
    diabetesMellitus: {
      type: "boolean",
    },
    insulinResistance: {
      type: "boolean",
    },
    systolicTension: {
      type: "integer",
    },
    diastolicTension: {
      type: "integer",
    },
    triglycerideLevel: {
      type: "integer",
    },
    waistCircumference: {
      type: "integer",
    },
    hipCircumference: {
      type: "integer",
    },
    albumin: {
      type: "integer",
    },
    creatine: {
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
    glucoseIntolerance: true,
    diabetesMellitus: true,
    insulinResistance: true,
    systolicTension: 130,
    diastolicTension: 80,
    triglycerideLevel: 145,
    waistCircumference: 16,
    hipCircumference: 80,
    albumin: 12,
    creatine: 20,
    userId: 0,
    result: false,
    resultDate: "2023-06-01 16:03:35.284+03",
  },
};

export default WHOSchema;
