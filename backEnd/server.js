import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

export default app;