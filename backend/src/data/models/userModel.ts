import { ObjectId } from "mongodb";

export default class UserModel {
    constructor(
        public username: string,
        public password: string,
        public _id?: ObjectId
    ) {}
}