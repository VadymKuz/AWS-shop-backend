import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError } from '../../utils/http.utils';
import { dbClient } from '../../database/database';
import { Product } from 'src/models/product';
import { handler } from 'src/utils/handler.utils';
import { QueryConfig } from 'pg';


export const createProduct = handler(async (event: APIGatewayProxyEvent): Promise<{ product: Product }> => {
    const product: Product = JSON.parse(event.body);
    const { title, description, price, imageUrl, amount } = product;

    try {
        await dbClient.query('begin transaction')
        const productQueryConfig: QueryConfig = {
            text: 'insert into product (title, description, price, imageUrl) values ($1, $2, $3, $4) returning *',
            values: [title, description, price, imageUrl]
        }
        const createdProduct = await dbClient.query(productQueryConfig)
            .catch(() => { throw new HttpError(HttpCode.BAD_REQUEST, 'Please provide correct product data') });

        const stockQueryConfig = {
            text: `insert into stock (product_id, count) values($1, $2) returning *`,
            values: [createdProduct.rows[0].id, amount],
        };
        const createdStock = await dbClient.query(stockQueryConfig)
            .catch(() => { throw new HttpError(HttpCode.BAD_REQUEST, 'Please provide correct product data') });

        await dbClient.query('commit');
        return { ...createdProduct.rows[0], amount: createdStock.rows[0].count };
    } catch (error) {
        await dbClient.query('rollback');
        throw error;
    }
})