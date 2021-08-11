import { IUser } from "../../entities/IUser";

export type CreateUserDTO = Omit<IUser, "id">;