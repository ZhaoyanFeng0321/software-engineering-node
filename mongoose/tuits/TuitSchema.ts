import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents a tuit post
 * @property {String} tuit The message in the tuit
 * @property {Date} postedOn The date the tuit was posted
 * @property {ObjectId} postedBy ID of user who posted tuit
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;