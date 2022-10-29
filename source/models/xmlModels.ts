import mongoose, { Schema } from 'mongoose';
import xmlInterface from '../interfaces/xmlInterface';

const xmlSchema: Schema = new Schema(
    {
        BBotID: { type: String, require: true },
        Active: { type: Boolean, require: true, unique: true },
        HasActivatedTool: { type: String, require: true},
        ValueBot: { type: Array, require: true },
        Name: { type: String, require: true },
    },
    {
        timestamps: true,
        collection: 'XML'
    }
);

export default mongoose.model<xmlInterface>('XML', xmlSchema);
