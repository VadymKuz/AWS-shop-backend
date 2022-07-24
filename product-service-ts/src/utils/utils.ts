import { CORS_HEADERS, HttpCode, IHeader, LambdaResponse } from "./http.utils";

export function handleResponse(statusCode: HttpCode, body: any, headers?: IHeader): LambdaResponse {
    return {
        statusCode,
        headers: { ...CORS_HEADERS, ...headers },
        body: JSON.stringify(body),
    }
}