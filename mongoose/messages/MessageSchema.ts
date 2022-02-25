import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents a message between users
 * @property {String} message The message that was sent/received
 * @property {ObjectId} from User ID who sent message
 * @property {ObjectId} to User ID who received message
 * @property {Date} sentOn Date message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type:String, required: true},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}

}, {collection: "messages"});
export default MessageSchema;