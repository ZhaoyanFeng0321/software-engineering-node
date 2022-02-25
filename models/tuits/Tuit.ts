/**
 * @file Declares Tuit data type
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents tuits posted by a user
 * @property {String} tuit Tuit being posted
 * @property {User} postedBy User that post the tuit
 * @property {Date} postedOn Date that post the tuit
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};