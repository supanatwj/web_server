import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc } from "./api/middleware.js";
import { handlerChirps } from "./api/chirps.js";
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

app.post('/admin/reset',handlerReset);
app.post("/api/validate_chirp",handlerChirps);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

