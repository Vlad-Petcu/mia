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
    },
  };
  
  export default EGSIRDSchema;
  