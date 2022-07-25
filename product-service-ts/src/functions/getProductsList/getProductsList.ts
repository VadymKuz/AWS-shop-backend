import { HttpCode, HttpError, LambdaResponse } from '../../utils/http.utils';
import { handleResponse } from '../../utils/utils';
import products from '../../data/products'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { dbConection } from '../../database/database';


export const getProductsList = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    let statusCode: HttpCode;
    let body: any;

    console.log(event);

    try {
        const data = (await dbConection.query(`
            select p.id, p.title, p.description, p.price, p.imageUrl, s.count from stock as s
            inner join product as p
            on s.product_id = p.id
        `)).rows;

        if (!products.length) {
            throw new HttpError(HttpCode.NOT_FOUND, 'Products not found')
        }

        statusCode = HttpCode.OK;
        body = { products: data };
    } catch (error) {
        statusCode = error.statusCode || HttpCode.SERVER_ERROR;
        body = { message: error.message };
    } finally {
        return handleResponse(statusCode, body);
    }
}