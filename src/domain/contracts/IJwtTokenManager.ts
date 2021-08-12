import { IJwtTokenManagerConfig } from "../common/IJwtTokenManagerConfig";

export interface IJwtTokenManager {
    /**
     * Generate JWT token
     * 
     * @param claims Claims to use in payload section
     * @returns A promise with generated JWT token.
     */
    generate(claims: { [k: string]: any }): Promise<string>;

    /**
     * Validate a token under configuration
     * 
     * @param token Token to validate
     */
    validate(token: string): Promise<boolean>;

    /**
     * Gets JWT tokens configuration
     */
    get config(): IJwtTokenManagerConfig;
}