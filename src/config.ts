type APIConfig = {
    fileserverHit: number;
    dbURL: string;
};

process.loadEnvFile();

function envOrThrow(key: string) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value
}

export const config: APIConfig = {
    fileserverHit: 0,
    dbURL: envOrThrow("DB_URL"),
}
