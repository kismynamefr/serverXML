import express from 'express';
const routerXML = express.Router();
import xmlController from '../controllers/xmlController';
import uploadBotController from '../controllers/uploadBotController';


routerXML.get('/', xmlController.handleXMl);
routerXML.get('/getbot', uploadBotController.getBotUploaded);
routerXML.post('/uploadbot', uploadBotController.handleUploadBot);
routerXML.post('/deleteBot', uploadBotController.handleDeleteBot);

export default routerXML;