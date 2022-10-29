import mongoose, { Schema } from 'mongoose';
import uploadBotInterface from '../interfaces/uploadBotInterface';

const uploadBotSchema: Schema = new Schema(
    {
        NameBot: { type: String, require: true, unique: true },
        ValueBot: { type: String, require: true, unique: true },
    },
    {
        timestamps: true,
        collection: 'UploadBot'
    }
);

export default mongoose.model<uploadBotInterface>('UploadBot', uploadBotSchema);
