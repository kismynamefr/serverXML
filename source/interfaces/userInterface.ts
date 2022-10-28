import { Document } from "mongoose";

export default interface userInterface extends Document {
    username: String,
    password: String,
    admin: Boolean
}