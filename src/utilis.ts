import { Response } from "express";

export function isDefined(obj: any, res: Response){
    if(obj) {
        res.json(obj);
        return
    }

    res.status(404).send();
}
export function sendErrorResponse(e: Error, res: Response) {
    res.statusCode = 500
    res.send({
        message: e.message
    })
}