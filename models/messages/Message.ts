/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents messages relationship between a user and another user,
 * as in a user messages another user
 * @property {User} from User messaging another user
 * @property {User} to User messaged by another user
 */

export default interface Message {
    message: string,
    from: User,
    to: User,
    sentOn?: Date
};