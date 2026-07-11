import { MigrationConfig } from "drizzle-orm/migrator";

type APIConfig = {
    fileserverHit: number;
    port: number;
};

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
};

type Config = {
    api: APIConfig;
    db: DBConfig;
};

process.loadEnvFile();

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

const migrationConfig: MigrationConfig = {
    migrationsFolder: "./src/db/migrations",
}

export const config: Config= {
    api: {
        fileserverHit: 0,
        port: Number(envOrThrow("PORT")),
    },
    db: {
        //url: envOrThrow("DB_URL") as string,
        url: "postgres://postgres:postgres@localhost:5432/chirpy?sslmode=disable",
        migrationConfig: migrationConfig,
    },
}
