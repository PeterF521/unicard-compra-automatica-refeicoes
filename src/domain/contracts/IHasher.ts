export interface IHasher {
    /**
     * Create a hash of a raw string.
     * 
     * @param raw String to hash.
     * @returns Hashed `raw`.
     */
    hash(raw: string): Promise<string>;

    /**
     * Compare a real hash with a raw string.
     * 
     * @param hash Hash used in comparation.
     * @param raw Raw string to compare with `hash`.
     * @returns Promise: `true` if real `hash` is equal with hashed `raw. Else returns `false`.
     */
    compare(hash: string, raw: string): Promise<boolean>;
}