import dotenv from 'dotenv';
import xmlModels from '../models/xmlModels';
import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
dotenv.config();

const handleActiveBot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { formValue }: any = req.body;
        let value: string | number;
        if (!formValue.ExpiredDay.length) value = 'NERVER';
        else value = moment(`${formValue.ExpiredDay}`).unix();
        const dto = new xmlModels({
            ...formValue,
            ExpiredDay: value,
        });
        await dto
            .save()
            .then((data) => res.status(200).json({ status: "Activated Bot" }))
            .catch((error) =>
                res.status(404).json({ status: "Saving bot activation data failed", error })
            );
    } catch (error) {
        return res.status(500).json(error);
    }
}
const getActivatedBot = async (req: Request, res: Response, next: NextFunction) => {
    const activeBot = await xmlModels.find();
    return res.status(200).json(activeBot);
}
const handleDeleteActivatedBot = async (req: Request, res: Response, next: NextFunction) => {
    const result = req.body;
    await xmlModels.deleteOne(result)
        .then(value => {
            if (value.deletedCount === 1) {
                return res.status(200).json({ status: "Successfully deleted the activated Bot" })
            } else {
                return res.status(500).json({ error: "No documents matched the query. Deleted 0 documents." })
            }
        })
}
const handleEditActivatedBot = async (req: Request, res: Response, next: NextFunction) => {
    const { formValue }: any = req.body;
    let value: any;
    if (formValue.ExpiredDay === 'NERVER') {
        value = 'NERVER';
        await xmlModels.findOneAndUpdate(
            { _id: formValue._id },
            {
                BBotID: formValue.BBotID,
                ValueBot: formValue.ValueBot,
                Name: formValue.Name,
                ExpiredDay: value
            }
        ).then((value: any) => {
            return res.status(200).json({ status: "Edit bot success" })
        }).catch((error) => {
            return res.status(500).json({ error: "Edit bot error" })
        })
    } else {
        value = moment(`${formValue.ExpiredDay}`).unix();
        await xmlModels.findOneAndUpdate(
            { _id: formValue._id },
            {
                BBotID: formValue.BBotID,
                ValueBot: formValue.ValueBot,
                Name: formValue.Name,
                ExpiredDay: value
            }
        ).then((value: any) => {
            return res.status(200).json({ status: "Edit bot success" })
        }).catch((error) => {
            return res.status(500).json({ error: "Edit bot error" })
        })
    }
}

export default {
    handleActiveBot,
    getActivatedBot,
    handleDeleteActivatedBot,
    handleEditActivatedBot
};
