import { defaultHeaders } from "./models";

export function getNotFoundResponse(message) {
    return {
        statusCode: 404,
        headers: defaultHeaders,
        body: JSON.stringify({
            message
        })
    }
}