import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllFollows = async (): Promise<Follow[]> => FollowModel.find().exec();

    findAllUsersFollower = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    findAllUsersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    userFollowsUser = async (uid: string, xuid: string): Promise<Follow> =>
        FollowModel.create({userFollowing: uid, userFollowed: xuid});

    userRemoveFollower = async (uid: string, xuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid, userFollowing: xuid});


    userUnfollowsUser = async (uid: string, xuid: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: uid, userFollowed: xuid});
}