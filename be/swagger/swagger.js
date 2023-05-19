import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import RegisterSchema from "../schemas/register-schema.js";
import LoginSchema from "../schemas/login-schema.js";
import AACEDSchema from "../schemas/aaced-schema.js";
import WHOSchema from "../schemas/who-defeinition.js";
import EGSIRDSchema from "../schemas/egsird-schema.js";
import NCEPATPIIISchema from "../schemas/ncepatpiii-schema.js";
import IDFGCDSchema from "../schemas/idfgcd-schema.js";
import SDMSSchema from "../schemas/sdms-schema.js";
import IDRSSchema from "../schemas/idrs-schema.js";
import LAPSchema from "../schemas/lap-schema.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MIA API Docs",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Register: RegisterSchema,
        Login: LoginSchema,
        AACED: AACEDSchema,
        WHO: WHOSchema,
        EGSIRD: EGSIRDSchema,
        NCEPATPIII: NCEPATPIIISchema,
        IDFGCD: IDFGCDSchema,
        SDMS: SDMSSchema,
        IDRS: IDRSSchema,
        LAP: LAPSchema,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./routes/register-routes.js",
    "./routes/login-routes.js",
    "./routes/user-routes.js",
    "./routes/aaced-routes.js",
    "./routes/egsird-routes.js",
    "./routes/idfgcd-routes.js",
    "./routes/idrs-routes.js",
    "./routes/lap-routes.js",
    "./routes/ncepatpiii-routes.js",
    "./routes/sdms-routes.js",
    "./routes/who-routes.js",
  ],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
