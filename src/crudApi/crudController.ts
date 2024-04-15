import { Request, Response } from "express";

export class CrudController{

    constructor(){}

    public getCrud = (req:Request, res:Response) => {
    
        res.json({id:'TODO BIEN'});
    
    }

}