import type { Request, Response } from "express";
import { respondWithJSON, respondWithError } from "./json.js";
import { BadRequestError } from "./Error.js";

export async function handlerChirps(req:Request, res:Response) {
    type parameters = { body: string };

    const params: parameters = req.body;
    const maxChirpLength = 140;

    if (params.body.length > maxChirpLength) {
        throw new BadRequestError(`Chirp is too long. Max length is ${maxChirpLength}`);
        //respondWithError(res, 400, "Chirp is too long");
    }

    respondWithJSON(res, 200, {
        valid: true
    });
}
