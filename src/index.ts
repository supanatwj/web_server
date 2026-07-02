import express, { NextFunction } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc, errorMiddleWare } from "./api/middleware.js";
import { handlerChirps } from "./api/chirps.js";
import { handlerMetrics } from "./admin/metrics.js";
import { handlerReset } from "./admin/reset.js";
import { config } from "./config.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(middlewareLogResponses);
app.use("/app",middlewareMetricsInc);
app.use("/app",express.static("./src/app"));

app.get("/api/healthz", (req, res, next) => {
    Promise.resolve(handlerReadiness(req, res)).catch(next);
});
app.get("/admin/metrics", (req, res, next) => {
    Promise.resolve(handlerMetrics(req, res)).catch(next);
});

app.post('/admin/reset', (req, res, next) => {
    Promise.resolve(handlerReset(req, res)).catch(next);
});
app.post("/api/validate_chirp",(req, res, next) => {
    Promise.resolve(handlerChirps(req, res)).catch(next);
});

app.use(errorMiddleWare);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

