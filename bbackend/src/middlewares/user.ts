import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import UsersConsults from "../consults/usersConsults";
import {Role} from "../models/user_model";

export default async function user_check(req: Request, res: Response, next: NextFunction){
    const {authorization}:string = req.headers;

    try{

        if(!authorization) throw new Error('Access not authorized');

        const token = authorization.split(' ')[1];

        const decoded: {id: string} | any = jwt.decode(token);

        if(!decoded) throw new Error('Access not authorized, but not decoded token');

        const user: any = await UsersConsults.searchById(decoded.id);

        if(!user) throw new Error('Access not authorized, user does not exist');

        return next();

    }catch (e: any) {
        return res.status(401).json(e.message);
    }
}