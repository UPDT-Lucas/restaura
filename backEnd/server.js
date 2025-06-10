import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import catalogos_routes from "./routes/collections.route.js";
import cliente_routes from "./routes/cliente.routes.js";
import bitacora_routes from "./routes/bitacora.route.js";
import admin_routes from "./routes/admin.route.js";
import cuarto_routes from "./routes/cuarto.route.js";
import reporte_routes from "./routes/reportes.route.js";
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(catalogos_routes);
app.use(cliente_routes);
app.use(bitacora_routes);
app.use(admin_routes);
app.use(cuarto_routes);
app.use(reporte_routes);

export default app;