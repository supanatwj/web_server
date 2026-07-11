import { defineConfig } from "drizzle-kit";
import { config } from "./src/config.js";

export default defineConfig({
    schema: "src/db/",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: config.dbURL,
    },
});
