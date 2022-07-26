import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError } from '../../utils/http.utils';
import { dbConection } from '../../database/database';
import { Product } from 'src/models/product';
import { handler } from 'src/utils/handler.utils';


export const createProduct = handler(async (event: APIGatewayProxyEvent): Promise<{ product: Product }> => {
    const product: Product = JSON.parse(event.body);
    const offset = (await dbConection.query(`select count(*) from product;`)).rows[0].count;
    const { title, description, price, imageUrl, amount } = product;

    return await dbConection.query(`
            begin transaction;
            insert into product (title, description, price, imageUrl) values ('${title}', '${description}', ${price}, '${imageUrl}');
            insert into stock (product_id, count) values ((select id from product limit 1 offset ${offset}), ${amount});
            commit;
        `)
        .then(() => ({ product }))
        .catch(() => { throw new HttpError(HttpCode.BAD_REQUEST, 'Please provide correct data') });
})