import { getNotFoundResponse } from '../../helpers';
import { defaultHeaders } from '../../models';
import products from '../../products'

export const getProductsList = async (event) => {
    try {
        if (!products.length) {
            return getNotFoundResponse('Products not found');
        }

        return {
            statusCode: 200,
            headers: defaultHeaders,
            body: JSON.stringify({ products })
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            headers: defaultHeaders,
            body: JSON.stringify({ message: error.message })
        }
    }
};
