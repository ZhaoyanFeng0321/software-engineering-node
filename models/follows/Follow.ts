/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and another user,
 * as in a user follows another user
 * @property {User} userFollowing User following another user
 * @property {User} userFollowed User followed by another user
 */

export default interface Follow {
    userFollowing: User,
    userFollowed: User
};