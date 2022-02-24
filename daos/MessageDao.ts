import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";
import MessageDaoI from "../interfaces/MessageDaoI";

export default class MessageDao implements MessageDaoI{
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    findAllMessagesFromUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid}).populate("message")
            .exec();

    findAllMessagesToUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid}).populate("message")
            .exec();

    findUserMessagesUser = async (uid: string, xuid: string): Promise<Message[]> =>
        MessageModel.find({from: uid, to: xuid})
            .populate("message")
            .exec();

    sendMessage = async (uid: string, xuid: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, from: uid, to: xuid});

    updateMessage = async (mid: string, message: Message): Promise<any> =>
        MessageModel.updateOne(
            {_id: mid},
            {$set: message});

    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});

}