import { Document } from 'mongoose';

export default interface xmlInterface extends Document {
    walletAddress: String;
    piecesID: String;
    attributePieces: String;
}
