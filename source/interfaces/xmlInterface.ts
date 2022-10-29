import { Document } from 'mongoose';

export default interface xmlInterface extends Document {
    BBotID: String;
    Active: Boolean;
    HasActivatedTool: String;
    ValueBot: Array<String>;
    Name: String;
}