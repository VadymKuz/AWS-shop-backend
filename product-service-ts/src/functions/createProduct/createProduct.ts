import { APIGatewayProxyEvent } from 'aws-lambda';
import { HttpCode, HttpError, LambdaResponse } from '../../utils/http.utils';
import { handleResponse } from '../../utils/utils';
import { dbConection } from '../../database/database';
import { Product } from 'src/models/product';


export const createProduct = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
    let statusCode: HttpCode;
    let body: any;

    try {
        const product: Product = JSON.parse(event.body);
        console.log('CreateProduct', { event, arguments: product })
        if (!validateData(product)) {
            throw new HttpError(HttpCode.BAD_REQUEST, 'Please provide correct data')
        }

        const offset = (await dbConection.query(`select count(*) from product;`)).rows[0].count;
        const { title, description, price, imageUrl, amount } = product;

        await dbConection.query(`
            begin transaction;
            insert into product (title, description, price, imageUrl) values ('${title}', '${description}', ${price}, '${imageUrl}');
            insert into stock (product_id, count) values ((select id from product limit 1 offset ${offset}), ${amount});
            commit;
        `).catch((err) => { throw new HttpError(HttpCode.SERVER_ERROR, err) })

        statusCode = HttpCode.OK;
        body = { product };
    } catch (error) {
        statusCode = error.statusCode || HttpCode.SERVER_ERROR;
        body = { message: error.message };
    } finally {
        return handleResponse(statusCode, body);
    }
}

const validateData = (product: Product): boolean => {
    const isCorrectString = (str: string): boolean => str && str.trim().length > 0;
    const isCorrectNumber = (num: number): boolean => num >= 0;

    return Object.values(product).every(value => {
        if (typeof value === 'string') return isCorrectString(value);
        if (typeof value === 'number') return isCorrectNumber(value);
    })
}