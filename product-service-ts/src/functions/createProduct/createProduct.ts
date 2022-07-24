// import { APIGatewayProxyEvent } from 'aws-lambda';
// import { HttpCode, LambdaResponse } from '../../utils/http.utils';
// import { handleResponse } from '../../utils/utils';
// import { dbConection } from '../../database/database';


// export const createProduct = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
//     let statusCode: HttpCode;
//     let body: any;
//     let product;

//     // return handleResponse(statusCode, JSON.parse(event.body));

//     try {
//         const product = JSON.parse(event.body);
//         console.log('CreateProduct', { event, arguments: product })
//         const client = await dbConection.connect();

//         const offset = (await client.query(`select count(*) from product;`)).rows[0].count;

//         // console.log(offset)

//         // return handleResponse(200, offset)


//         // await client.query(`select * from product as p where p.id = '${id}' `)
//         //     .then(res => (product = res.rows[0]))
//         //     .catch(() => { throw new HttpError(HttpCode.NOT_FOUND, 'Product not found') })

//         // statusCode = HttpCode.OK;
//         // body = { product };
//     } catch (error) {
//         // statusCode = error.statusCode || HttpCode.SERVER_ERROR;
//         // body = { message: error.message };
//     } finally {
//         // return handleResponse(statusCode, body);
//     }
// }