/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Likes
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all users that bookmark a tuit
     * @param {String} tid Key for tuit that bookmarked
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedUser")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all tuits that a user bookmarks
     * @param {String} uid Key for user to retrieve bookmarks from
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedUser: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Inserts bookmark instance into database
     * @param {String} uid Key for user bookmarking tuit
     * @param {String} tid Key for tuit being bookmarked
     * @returns Promise to be notified when bookmark is updated
     * in the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedUser: uid, bookmarkedTuit: tid});

    /**
     * Removes bookmark from database
     * @param {String} uid Key for user bookmarking tuit
     * @param {String} tid Key for tuit being bookmarked
     * @returns Promise to be notified when bookmark is removed
     * from database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedUser: uid, bookmarkedTuit: tid});

    /**
     * Uses BookmarkModel to retrieve all bookmarks
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks = async (): Promise<Bookmark[]> =>
            BookmarkModel.find();

}