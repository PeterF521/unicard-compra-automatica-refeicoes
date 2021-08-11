import { IHasher } from "../../contracts/IHasher";
import { IRepository } from "../../contracts/IRepository";
import { IUser } from "../../entities/IUser";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private _usersRepository: IRepository<IUser>,
        private _hasher: IHasher
    ) {}

    async createUser(user: CreateUserDTO): Promise<IUser> {
        const foundUser = await this._usersRepository.findOne({ email: user.email });
        if(foundUser) throw new Error("Utilizador já existente.");

        const userToSave: Omit<IUser, "id"> = {
            ...user,
            password: await this._hasher.hash(user.password)
        };
        const id = await this._usersRepository.insertOne(userToSave);

        return {
            ...userToSave,
            id
        };
    }
}