import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedUser")
            .exec();
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedUser: uid})
            .populate("bookmarkedTuit")
            .exec();
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedUser: uid, bookmarkedTuit: tid});
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedUser: uid, bookmarkedTuit: tid});

    findAllBookmarks(): Promise<Bookmark[]> {
        return Promise.resolve([]);
    }
}