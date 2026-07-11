import express from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc, errorMiddleWare } from "./api/middleware.js";
import { handlerChirps } from "./api/chirps.js";
import { handlerMetrics } from "./admin/metrics.js";
import { handlerReset } from "./admin/reset.js";
import { config } from "./config.js";

import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

console.log("=== CHECK URL ===", config?.db?.url);
const migrationClient = postgres(config.db.url, { max: 1 });
//@ts-ignore
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();

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
app.listen(config.api.port, () => {
    console.log(`Server is running at http://localhost:${config.api.port}`);
});

