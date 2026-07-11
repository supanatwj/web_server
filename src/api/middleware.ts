import type { Request, Response, NextFunction } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";
import { 
    BadRequestError,
    NotFoundError,
    UserForbiddenError,
    UserNotAuthenticatedError,

} from "./Error.js"

export async function middlewareLogResponses(req: Request, res: Response, next: NextFunction) {
    res.on("finish", () => {
        const status = res.statusCode;

        if (status >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`);
        }
    });

    next();
}

export async function middlewareMetricsInc(req: Request, res: Response, next: NextFunction) {
    config.api.fileserverHit++;
    next();
}

export function errorMiddleWare( err: Error, _:Request, res: Response, __: NextFunction) { 
    let statusCode = 500;
    let message = "Someting went wrong on our end";

    if (err instanceof BadRequestError) {
        statusCode = 400;
        message = err.message;
    } else if (err instanceof UserForbiddenError) {
        statusCode = 401;
        message = err.message;
    } else if (err instanceof UserNotAuthenticatedError) {
        statusCode = 403;
        message = err.message;
    } else if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message;
    } 
    if (statusCode >= 500) {
        // Handle unexpected/generic errors (500)
        console.log(err.message); // Log for internal debugging
  }

  respondWithError(res, statusCode, message);
}
