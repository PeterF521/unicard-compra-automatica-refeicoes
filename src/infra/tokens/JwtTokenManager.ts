import { IJwtTokenManagerConfig } from "../../domain/common/IJwtTokenManagerConfig";
import { IJwtTokenManager } from "../../domain/contracts/IJwtTokenManager";
import crypto from "crypto";

export class JwtTokenManager implements IJwtTokenManager {
    private _config: IJwtTokenManagerConfig;

    constructor(config: IJwtTokenManagerConfig) {
        this._config = config;
    }

    async generate(claims: { [k: string]: any; }): Promise<string> {
        const header = {
            alg: "HS256",
            typ: "JWT"
        };
        const base64Header = this._encodeBase64(JSON.stringify(header));

        const { secret, ...publicClaims } = this._config;
        const payload = {
            ...claims
        };
        // Prevent undefined values on payload
        for(const [name, value] of Object.keys(publicClaims)) {
            if(value) {
                switch(name as keyof typeof publicClaims) {
                    case "audience":
                        payload.aud = value;
                        break;

                    case "issuer":
                        payload.iss = value;
                        break;

                    case "maxAge":
                        payload.exp = value;
                        break;
                }
            }
        }
        const base64Payload = this._encodeBase64(JSON.stringify(payload));

        const partialToken = `${base64Header}.${base64Payload}`;
        const base64Signature = crypto
            .createHmac("sha256", secret)
            .update(partialToken)
            .digest()
            .toString("base64url");

        return `${partialToken}.${base64Signature}`;
    }

    async validate(token: string): Promise<boolean> {
        const extractorRegex = /^(.+)\.(.+)\.(.+)/;
        const result = extractorRegex.exec(token);
        if(!result) return false;

        const header = result[1];
        const payload = result[2];
        const signature = result[3];
        const parsedHeader = JSON.parse(this._decodeBase64(header));
        const parsedPayload = JSON.parse(this._decodeBase64(payload));
        const expectedSignature = crypto
            .createHmac("sha256", this._config.secret)
            .update([ header, payload ].join("."))
            .digest()
            .toString("base64url");

        if(parsedHeader.typ != "JWT") return false;
        if(parsedHeader.alg != "HS256") return false;
        if(this._config.issuer && this._config.issuer != parsedPayload.iss) return false;
        if(this._config.audience && this._config.audience != parsedPayload.aud) return false;
        const currentTimestamp = Date.now();
        if(this._config.maxAge && parsedPayload.exp <= currentTimestamp) return false;
        if(expectedSignature != signature) return false;

        return true;
    }

    private _encodeBase64(raw: string) {
        const buffer = Buffer.from(raw);
        return buffer.toString("base64url");
    }

    private _decodeBase64(base64String: string) {
        const buffer = Buffer.from(base64String, "base64url");
        return buffer.toString("utf-8");
    }

    get config(): IJwtTokenManagerConfig {
        return this._config;
    }
}