/**
 * @file Declares Bookmark data type representing relationship between
 * users, as in user bookmarks a tuit
 */
import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkedUser User bookmarking the tuit
 */

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedUser: User
};