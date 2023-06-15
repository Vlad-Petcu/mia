const AACEDSchema = {
  type: "object",
  required: [
    "glucoseIntolerance",
    "abnormalUricAcidMetabolism",
    "dyslipidemia",
    "hemodynamicChanges",
    "prothromboticFactors",
    "markersOfInflammation",
    "endothelialDysfunction",
    "userId",
    "result",
    "resultDate"
  ],
  properties: {
    glucoseIntolerance: {
      type: "boolean",
    },
    abnormalUricAcidMetabolism: {
      type: "boolean",
    },
    dyslipidemia: {
      type: "boolean",
    },
    hemodynamicChanges: {
      type: "boolean",
    },
    prothromboticFactors: {
      type: "boolean",
    },
    markersOfInflammation: {
      type: "boolean",
    },
    endothelialDysfunction: {
      type: "boolean",
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
    glucoseIntolerance: true,
    abnormalUricAcidMetabolism: true,
    dyslipidemia: true,
    hemodynamicChanges: true,
    prothromboticFactors: true,
    markersOfInflammation: true,
    endothelialDysfunction: true,
    userId: 0,
    result: true,
    resultDate: "2023-06-01 16:03:35.284+03",
  },
};

export default AACEDSchema;
