/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllFollows = async (): Promise<Follow[]> => FollowModel.find().exec();

    /**
     * Uses FollowModel to retrieve all followers of user
     * @param {String} uid Key for user to retrieve followers from
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    /**
     * Uses FollowModel to retrieve all those the user is following
     * @param {String} uid Key for user to retrieve following from
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Inserts follow between users into database
     * @param uid Key for user who is following
     * @param xuid Key for user who is followed
     * @returns Promise to be notified when follow is updated in the database
     */
    userFollowsUser = async (uid: string, xuid: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: xuid});

    /**
     * Removes follower from the side of user being followed in database
     * @param {String} uid Key for user who is followed
     * @param {String} xuid Key for user who is following
     * @returns Promise to be notified when follow is deleted in the database
     */
    userRemoveFollower = async (uid: string, xuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: xuid});


    /**
     * Removes following from the follower side in database
     * @param {String} uid Key for user who is following
     * @param {String} xuid Key for user who is followed
     * @returns Promise to be notified when follow is deleted in the database
     */
    userUnfollowsUser = async (uid: string, xuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: xuid});
}