import { IBaseEntity } from "../common/IBaseEntity";

export interface IRepository<TEntity extends IBaseEntity> {
    /**
     * Find a document using `query`.
     * 
     * @param query Properties to query
     * @returns A Promise with first document found. If any document was found returns null.
     */
    findOne(query: Partial<TEntity>): Promise<TEntity | null>;

    /**
     * Find every documents found with `query` parameter conditions.
     * 
     * @param query Properties to query
     * @returns An array with documents found.
     */
    findMany(query: Partial<TEntity>): Promise<TEntity[]>;

    /**
     * Inserts a document into database.
     * 
     * @param doc Entity to push into database.
     * @returns A promise with `id` of inserted document.
     */
    insertOne(doc: Omit<TEntity, "id">): Promise<string>;

    /**
     * Inserts many documents into database.
     * 
     * @param docs Entities to push into database.
     * @returns A promise with pushed documents.
     */
    insertMany(docs: Omit<TEntity, "id">[]): Promise<TEntity[]>;
}