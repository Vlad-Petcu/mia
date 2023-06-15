const EGSIRDSchema = {
    type: "object",
    required: [
      "gender",
      "plasmaInsulin",
      "waistCircumference",
      "systolicTension",
      "diastolicTension",
      "triglycerideLevel",
      "impairedFastingGlucose",
      "userId",
      "result",
      "resultDate"
    ],
    properties: {
      gender: {
        type: "string",
      },
      plasmaInsulin: {
        type: "integer",
      },
      waistCircumference: {
        type: "integer",
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
      impairedFastingGlucose: {
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
      plasmaInsulin: 78,
      waistCircumference: 105,
      systolicTension: 130,
      diastolicTension: 80,
      triglycerideLevel: 145,
      impairedFastingGlucose: 16,
      userId: 0,
      result: false,
      resultDate: "2023-06-01 16:03:35.284+03",
    },
  };
  
  export default EGSIRDSchema;
  