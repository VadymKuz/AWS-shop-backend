import { HttpCode, HttpError } from '../../utils/http.utils';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { dbConection } from '../../database/database';
import { Product } from 'src/models/product';
import { handler } from 'src/utils/handler.utils';


export const getProductsList = handler(async (_event: APIGatewayProxyEvent): Promise<{ products: Product[] }> => {
    return await dbConection.query(`
        select p.id, p.title, p.description, p.price, p.imageUrl, s.count from stock as s
        inner join product as p
        on s.product_id = p.id
    `)
        .then(res => ({ products: res.rows }))
        .catch(error => { throw new HttpError(HttpCode.SERVER_ERROR, error) })
})