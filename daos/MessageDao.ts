/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all messages sent by user
     * @param {String} uid Key for user sending messages
     * @returns Promise to be notified when messages are retrieved from database
     */
    findAllMessagesFromUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    /**
     * Uses MessageModel to retrieve all messages received by user
     * @param {String} uid Key for user that received messages
     * @returns Promise to be notified when messages are retrieved from database
     */
    findAllMessagesToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});

    /**
     * Uses MessageModel to retrieve all messages sent from a user to a user
     * @param {String} uid Key for user sending messages
     * @param {String} xuid Key for user receiving message
     * @returns Promise to be notified when messages are retrieved from database
     */
    findUserMessagesUser = async (uid: string, xuid: string): Promise<Message[]> =>
        MessageModel.find({from: uid, to: xuid});

    /**
     * Insert message instance into database
     * @param {String} uid Key for user sending message
     * @param {String} xuid Key for user receiving message
     * @param {Message} message Message Instance to be inserted into database
     * @returns Promise to be notified when message is inserted into database
     */
    sendMessage = async (uid: string, xuid: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: xuid});

    /**
     * Update message
     * @param {String} mid Key for message being removed
     @param {Message} message Message Instance to be inserted into database
     * @returns Promise to be notified when message is updated into database
     */
    updateMessage = async (mid: string, message: Message): Promise<any> =>
        MessageModel.updateOne(
            {_id: mid},
            {$set: message});

    /**
     * Removes message from database
     * @param {String} mid Key for message being removed
     * @returns Promise to be notified when message is removed from database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

}