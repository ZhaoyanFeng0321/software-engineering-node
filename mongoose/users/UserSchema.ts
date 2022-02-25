import mongoose from "mongoose";
import User from "../../models/users/User";
/**
 * @typedef User Represents a user on Tuitter
 * @property {String} username Username to log in
 * @property {String} password Password to log in
 * @property {String} firstName First name of user
 * @property {String} lastName Last name of user
 * @property {String} email Email of user
 * @property {String} profilePhoto Profile photo for user
 * @property {String} headerImage Header image for user
 * @property {String} accountType Type of account user has
 * @property {String} martialStatus Martial status of user
 * @property {String} biography Biography of user
 * @property {Date} dateOfBirth Birth date of user
 * @property {Location} location Location of user
 * @property {Number} salary Salary of user
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;