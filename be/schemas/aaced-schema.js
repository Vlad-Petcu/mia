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
  },
};

export default AACEDSchema;
