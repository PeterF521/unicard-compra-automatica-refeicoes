export interface IJwtTokenManagerConfig {
    issuer?: string;
    maxAge?: number;
    audience?: string;
    secret: string;
}