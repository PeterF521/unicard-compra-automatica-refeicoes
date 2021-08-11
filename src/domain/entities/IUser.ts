import { IBaseEntity } from "../common/IBaseEntity";

export interface IUser extends IBaseEntity {
    name: string;
    email: string;
    password: string;
}