export const CORS_HEADERS: IHeader = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
}

export interface IHeader {
    [key: string]: string | boolean;
}

export enum HttpCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
}

export class HttpError extends Error {
    constructor(
        public readonly statusCode: HttpCode,
        message: string
    ) {
        super(message);
    }
}

export interface LambdaResponse {
    statusCode: HttpCode,
    headers: IHeader,
    body: string,
}