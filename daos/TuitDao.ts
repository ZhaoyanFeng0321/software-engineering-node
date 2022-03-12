/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Users
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to find all tuits
     * @returns Promise to be notified when tuits are retrieved from database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitModel to find all tuits by a certain user
     * @param {String} uid Key for user to find tuits from
     * @returns Promise to be notified when tuits are retrieved from database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitModel to find a specific tuit
     * @param {String} uid Key for tuit that is wanted
     * @returns Promise to be notified when tuit is retrieved from database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts a tuit instance into database
     * @param {String} uid Key for user that made tuit
     * @param {Tuit} tuit Tuit instance to be inserted into database
     * @returns Promise to be notified when tuit is inserted in database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates a tuit in database
     * @param {String} uid Key for tuit to be updated
     * @param {Tuit} tuit Tuit instance to be inserted into database
     * @returns Promise to be notified when tuit is updated in database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});

    /**
     * Removes a tuit from database
     * @param {String} uid Key for tuit to be removed
     * @returns Promise to be notified when tuit is removed from database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});

    /**
     * Inserts a tuit instance into database
     * @param {Tuit} tuit Tuit instance to be inserted into database
     * @returns Promise to be notified when tuit is inserted in database
     */
    createTuit = async(tuit: Tuit): Promise<Tuit> =>
        TuitModel.create(tuit);
    deleteTuitsByTuit = async (tuit: string): Promise<any> =>
        TuitModel.deleteMany({tuit});
}