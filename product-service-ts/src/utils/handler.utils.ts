import { APIGatewayProxyEvent } from "aws-lambda";
import { dbConection } from "src/database/database";
import { CORS_HEADERS, HttpCode } from "./http.utils";
import logger from './logger.utils'


export const handler = (callback: (event: APIGatewayProxyEvent) => Promise<any>) =>
    async (event: APIGatewayProxyEvent) => {
        const { body, pathParameters, queryStringParameters } = event;
        let statusCode: HttpCode;
        let result: any;

        try {
            logger.log('REQUEST:', { body, pathParameters, queryStringParameters });

            result = await callback(event);
            statusCode = HttpCode.OK;

            logger.log('RESULT', result)
        } catch (err) {
            statusCode = err.statusCode || HttpCode.SERVER_ERROR;
            result = { statusCode, message: err.message, };
            logger.error('ERROR', result)
        } finally {
            dbConection.end();
            return {
                statusCode,
                headers: CORS_HEADERS,
                body: JSON.stringify(result),
            };
        }
    }