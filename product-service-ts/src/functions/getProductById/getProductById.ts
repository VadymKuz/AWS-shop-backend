import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError, LambdaResponse } from '../../utils/http.utils';
import { handleResponse } from '../../utils/utils';
import products from '../../data/products'


export const getProductById = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    let statusCode: HttpCode;
    let body: any;

    try {
        const { id } = event.pathParameters;
        const product = products.find(product => product.id === id);

        if (!product) {
            throw new HttpError(HttpCode.NOT_FOUND, 'Product not found')
        }

        statusCode = HttpCode.OK;
        body = { product };
    } catch (error) {
        statusCode = error.statusCode || HttpCode.SERVER_ERROR;
        body = { message: error.message };
    } finally {
        return handleResponse(statusCode, body);
    }
}