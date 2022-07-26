import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError } from '../../utils/http.utils';
import { dbConection } from '../../database/database';
import { Product } from 'src/models/product';
import { handler } from 'src/utils/handler.utils';


export const getProductById = handler(async (event: APIGatewayProxyEvent): Promise<{ product: Product }> => {
    const { id } = event.pathParameters;
    return await dbConection.query(`select * from product as p where p.id = '${id}' `)
        .then(res => res.rows[0])
        .catch(() => { throw new HttpError(HttpCode.NOT_FOUND, 'Product not found') })
});