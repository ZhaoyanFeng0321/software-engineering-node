/**
 * @file Declares User data type
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

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

export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};