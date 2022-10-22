import mongoose, { Schema } from 'mongoose';
import xmlInterface from '../interfaces/xmlInterface';

const xmlSchema: Schema = new Schema(
    {
        walletAddress: { type: String, require: true, maxlength: 42 },
        piecesID: { type: String, require: true, unique: true, minlength: 1 },
        attributePieces: { type: String, require: true, minlength: 1 },
    },
    {
        timestamps: true,
        collection: 'Monster'
    }
);

export default mongoose.model<xmlInterface>('XML', xmlSchema);
