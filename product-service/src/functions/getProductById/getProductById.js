import { getNotFoundResponse } from '../../helpers';
import { defaultHeaders } from '../../models';
import products from '../../products'

export const getProductById = async (event) => {
    try {
        const { id } = event.pathParameters;
        const product = products.find(product => product.id === id);

        if (!product) {
            return getNotFoundResponse('Product not found');
        }

        return {
            statusCode: 200,
            headers: defaultHeaders,
            body: JSON.stringify({
                product
            })
        };
    } catch (error) {
        console.log(error);
    }
};