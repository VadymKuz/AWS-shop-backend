import { getProductsList } from './getProducts';
import products from '../../products';
import { defaultHeaders } from '../../models';

describe('getProducts', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    test('should return array of products', async () => {
        const mResponse = { statusCode: 200, headers: defaultHeaders, body: JSON.stringify({ products }) };
        const actualValue = await getProductsList();
        expect(actualValue).toEqual(mResponse);
    });
})