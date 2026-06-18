import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerMetrics } from "./admin/metrics.js";
import { handlerReset } from "./admin/reset.js";
import { config } from "./config.js";

const app = express();
const PORT = 8080;

app.use(middlewareLogResponses);
app.use("/app",middlewareMetricsInc);
app.use("/app",express.static("./src/app"));

app.get("/api/healthz", handlerReadiness);
app.get("/admin/metrics",handlerMetrics);
app.get('/admin/reset',handlerReset);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

