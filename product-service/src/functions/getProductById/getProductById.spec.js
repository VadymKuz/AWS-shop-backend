import products from '../../products';
import { defaultHeaders } from '../../models';
import { getProductById } from './getProductById';

describe('getProductById', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    test('should return specific product', async () => {
        const mId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
        const product = products.find(p => p.id === mId);
        const mResponse = { statusCode: 200, headers: defaultHeaders, body: JSON.stringify({ product }) };
        const actualValue = await getProductById({ pathParameters: { id: mId } });
        expect(actualValue).toEqual(mResponse);
    });

    test('should return 404 error', async () => {
        const mResponse = { statusCode: 404, headers: defaultHeaders, body: JSON.stringify({ message: 'Product not found' }) };
        const actualValue = await getProductById({ pathParameters: { id: '' } });
        expect(actualValue).toEqual(mResponse);
    });
})