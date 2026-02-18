import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    let token: string| undefined = req.header("Authorization");

    process.loadEnvFile();
    if(!token){
        res.status(401).json({"message": "Not Authorized"}); 
        return;
    }
    try {
        token = token.replace("Bearer ","");
        const secret: string = process.env.JWT_SECRET || "";
        const decoded: any = await  jwt.verify(token, secret);
        req.params.id = decoded.id;
        next();
    }catch(error){
        console.error(error);
        if(error instanceof TokenExpiredError){
            res.status(401).json({"message": "Token expired"});
            return;
        }
        res.status(401).json({"message": "Not Authorized"});
    }
}