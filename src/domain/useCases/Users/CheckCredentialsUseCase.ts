import { IHasher } from '../../contracts/IHasher';
import { IRepository } from '../../contracts/IRepository';
import { IUser } from '../../entities/IUser';

export class CheckCredentialsUseCase {
    constructor(
        private _usersRepository: IRepository<IUser>,
        private _hasher: IHasher
    ) {}

    async check(email: string, password: string): Promise<IUser | null> {
        const foundUser = await this._usersRepository.findOne({ email });
        if (foundUser && this._hasher.compare(foundUser.password, password)) {
            return foundUser;
        }

        return null;
    }
}
