import { HttpCode, HttpError, LambdaResponse } from '../../utils/http.utils';
import { handleResponse } from '../../utils/utils';
import products from '../../data/products'
import { APIGatewayProxyEvent } from 'aws-lambda';


export const getProductsList = async (_event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    let statusCode: HttpCode;
    let body: any;

    try {
        if (!products.length) {
            throw new HttpError(HttpCode.NOT_FOUND, 'Products not found')
        }

        statusCode = HttpCode.OK;
        body = { products };
    } catch (error) {
        statusCode = error.statusCode || HttpCode.SERVER_ERROR;
        body = { message: error.message };
    } finally {
        return handleResponse(statusCode, body);
    }
}