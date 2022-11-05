import express from 'express';
const routerXML = express.Router();
import xmlController from '../controllers/xmlController';
import uploadBotController from '../controllers/uploadBotController';


routerXML.get('/getbot', uploadBotController.getBotUploaded);
routerXML.get('/getActivatedBot', xmlController.getActivatedBot);
routerXML.post('/activebot', xmlController.handleActiveBot);
routerXML.post('/uploadbot', uploadBotController.handleUploadBot);
routerXML.post('/deleteBot', uploadBotController.handleDeleteBot);
routerXML.post('/deleteActivatedBot', xmlController.handleDeleteActivatedBot);
routerXML.post('/editActivatedBot', xmlController.handleEditActivatedBot);

export default routerXML;