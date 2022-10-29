import uploadBotModel from '../models/uploadBotModel';
import { NextFunction, Request, Response } from 'express';

const handleUploadBot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { NameBot, ValueBot } = req.body;
        const dto = new uploadBotModel({
            NameBot: NameBot,
            ValueBot: JSON.parse(ValueBot)
        });
        await dto
            .save()
            .then((data) => res.status(200).json({ status: "Upload Bot Success" }))
            .catch((error) =>
                res.status(404).json({ status: "Upload Bot failed", error })
            );
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getBotUploaded = async (req: Request, res: Response, next: NextFunction) => {
    const bot = await uploadBotModel.find();
    return res.status(200).json(bot);
}
const handleDeleteBot = async (req: Request, res: Response, next: NextFunction) => {
    const result = req.body;
    await uploadBotModel.deleteOne(result)
        .then(value => {
            if (value.deletedCount === 1) {
                return res.status(200).json({ status: "Delete Bot Success" })
            } else {
                return res.status(500).json({ error: "No documents matched the query. Deleted 0 documents." })
            }
        })
}

export default {
    handleUploadBot,
    getBotUploaded,
    handleDeleteBot
};
