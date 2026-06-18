import type { Request, Response } from "express";
import { config } from "../config.js";

export async function handlerMetrics(_:Request, res:Response) {
    res.setHeader("content-type","text/html; charset=utf-8");
    const htmlRes = `
        <html>
            <h1>Welcome, Chirpy Admin</h1>
            <p>Chirpy has been visited ${config.fileserverHit} times!</p>
        </html>`;

    res.send(htmlRes); 
}
