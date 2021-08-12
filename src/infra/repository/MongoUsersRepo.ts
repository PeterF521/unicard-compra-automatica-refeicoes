import { IRepository } from '../../domain/contracts/IRepository';
import { IUser } from '../../domain/entities/IUser';
import { Db, Collection } from "mongodb";

export class MongoUsersRepo implements IRepository<IUser> {
    private _collection: Collection<IUser>;

    constructor(db: Db) {
        this._collection = db.collection("Users");
    }

    async findOne(query: Partial<IUser>): Promise<IUser | null> {
        const foundUser = await this._collection.findOne(query);

        return foundUser ? foundUser : null;
    }

    async findMany(query: Partial<IUser>): Promise<IUser[]> {
        const foundUser = await this._collection.find(query).toArray();

        return foundUser;
    }

    async insertOne(doc: Omit<IUser, 'id'>): Promise<string> {
        const result = await this._collection.insertOne(doc as IUser);

        return result.insertedId.toHexString();
    }

    async insertMany(docs: Omit<IUser, 'id'>[]): Promise<IUser[]> {
        throw new Error("Method not implemented!");
    }
}
