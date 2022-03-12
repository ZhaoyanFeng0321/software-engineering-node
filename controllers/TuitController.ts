/**
 * @file Controller RESTful Web service API for tuits resource
 */
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/tuits/Tuit";
import {Express, Request, Response} from "express";
import TuitControllerI from "../interfaces/TuitControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuit resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *   <li> GET /tuits to retrieve all tuits
 *   </li>
 *   <li> GET /tuits/:tid to retrieve a specific tuit
 *   </li>
 *   <li> GET /users/:uid/tuits to retrieve all tuits by user
 *   </li>
 *   <li> POST /users/:uid/tuits to create a new tuit
 *   </li>
 *   <li> DELETE /tuits/:tid to remove an existing tuit
 *   </li>
 *   <li> PUT /tuits/:tid to modify an existing tuit
 *   </li>
 * </ul>
 * @property {Express} app Express instance to declare the RESTful Web service API
 * @property {TuitDao} tuitDAo Singleton DAO implementing tuit CRUD operations
 * */

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/users/:uid/tuits", TuitController.tuitController.findAllTuitsByUser);
            app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
            app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.post("/api/tuits", TuitController.tuitController.createTuit);
            app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
            app.get("/api/tuits/tuit/:tuit/delete", TuitController.tuitController.deleteTuitsByTuit);

        }
        return TuitController.tuitController;
    }

    private constructor() {}

    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Retrieves all tuits
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    /**
     * Retrieves all tuits from specific user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));

    /**
     * Retrieves specific tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit wanted
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit wanted
     */
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Creates a new tuit
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user making the tuit as well as the body
     * containing the JSON object for the new tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted
     * into the database
     */
    createTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuitByUser(req.params.uid, req.body)
            .then((tuit: Tuit) => res.json(tuit));

    /**
     * Updates an existing tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the existing tuit, and body containing
     * JSON object to update tuit
     * @param {Response} res Represents response to client, including
     * status on whether updating the tuit was successful or not
     */
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));

    /**
     * Deletes an existing tuit
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the tuit
     * @param {Response} res Represents response to client, including
     * status on whether deleting the tuit was successful or not
     */
    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));

    deleteTuitsByTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuitsByTuit(req.params.tuit)
            .then(status => res.send(status));
};