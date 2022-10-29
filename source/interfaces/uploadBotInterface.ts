import { Document } from "mongoose";

export default interface uploadBotInterface extends Document {
    NameBot: String,
    ValueBot: String,
}