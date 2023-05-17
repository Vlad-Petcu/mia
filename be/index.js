import express, { json } from "express";
import cors from "cors";
// import authRouter from './routes/auth-routes.js';
import usersRouter from "./routes/user-routes.js";
import aacedRouter from "./routes/aaced-routes.js";
import egsirdRouter from "./routes/egsird-routes.js";
import idfgcdRouter from "./routes/idfgcd-routes.js";
import idrsRouter from "./routes/idrs-routes.js";
import lapRouter from "./routes/lap-routes.js";
import ncepatpiiiRouter from "./routes/ncepatpiii-routes.js";
import sdmsRouter from "./routes/sdms-routes.js";
import whoRouter from "./routes/who-routes.js"
import swaggerDocs from "../be/swagger/swagger.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);

  swaggerDocs(app, port);
});

app.get("/", (response) => {
  response.json({ info: "Welcome to MIA API" });
});

// app.use('/api/auth',authRouter);
app.use("/users", usersRouter);
app.use("/AACED", aacedRouter);
app.use("/EGSIRD", egsirdRouter);
app.use("/IDFGCD", idfgcdRouter);
app.use("/IDRS", idrsRouter);
app.use("/LAP", lapRouter);
app.use("/NCEPATPIII", ncepatpiiiRouter);
app.use("/SDMS", sdmsRouter);
app.use("/WHO", whoRouter);
