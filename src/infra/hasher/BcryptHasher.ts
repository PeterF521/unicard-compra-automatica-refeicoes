import { IHasher } from "../../domain/contracts/IHasher";
import bcrypt, { hash } from "bcrypt";

export const BcryptHasher: IHasher = {
    async compare(hash: string, raw: string) {
        return bcrypt.compare(raw, hash);
    },

    async hash(raw: string) {
        return bcrypt.hash(raw, 10);
    }
}