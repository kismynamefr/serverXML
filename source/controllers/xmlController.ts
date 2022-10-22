import dotenv from 'dotenv';
import xmlModels from '../models/xmlModels';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

const handleXMl = (req: Request, res: Response, next: NextFunction) => {
    return res.send('hello world');
}

export default {
    handleXMl
};
