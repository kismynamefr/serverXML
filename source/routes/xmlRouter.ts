import express from 'express';
const routerXML = express.Router();
import xmlController from '../controllers/xmlController';

routerXML.get('/', xmlController.handleXMl);

export default routerXML;