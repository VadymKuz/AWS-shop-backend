import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError, LambdaResponse } from '../../utils/http.utils';
import { handleResponse } from '../../utils/utils';
import { dbConection } from '../../database/database';
import { Product } from 'src/models/product';


export const getProductById = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    let statusCode: HttpCode;
    let body: any;
    const { id } = event.pathParameters;
    console.log('GetProductById', { event, arguments: id })

    try {
        let product: Product;
        await dbConection.query(`select * from product as p where p.id = '${id}' `)
            .then(res => (product = res.rows[0]))
            .catch(() => { throw new HttpError(HttpCode.NOT_FOUND, 'Product not found') })

        statusCode = HttpCode.OK;
        body = { product };
    } catch (error) {
        statusCode = error.statusCode || HttpCode.SERVER_ERROR;
        body = { message: error.message };
    } finally {
        return handleResponse(statusCode, body);
    }
}