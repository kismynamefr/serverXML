import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import config from './config/config';
import logging from './config/logging';
import xmlRouter from './routes/xmlRouter';
import rateLimit from "express-rate-limit";
import routerUsers from "./routes/userRouter";
import "./schedule/schedule";

const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});
/** Connect to Mongo */

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'Mongo Connected');
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Limit request API */
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 60,
    handler: (req: Request, res: Response) => {
        return res.status(429).send({
            status: 500,
            message: "Too many requests!",
        });
    },
});
/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());
router.use(cookieParser());

/** Rules of our API */
router.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/** Routes go here */
router.use('/apiXML/v1', xmlRouter);
router.use("/apiXML/v1/users", apiLimiter, routerUsers);
router.get('/apiXML', (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to Server XML');
});

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found");
    return res.status(404).json({
        message: error.message,
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
