import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import catalogos_routes from "./routes/collections.route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(catalogos_routes);


export default app;