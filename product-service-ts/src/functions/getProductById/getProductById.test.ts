import { APIGatewayProxyEvent } from 'aws-lambda';
import { getProductById } from './getProductById';

const MOCK_PRODUCT = {
    "count": 4,
    "description": "Madone SLR 9 is ultralight, insanely fast, and super smooth. It's the ride you reach for on race day when every watt counts and your eyes are on the top step.",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "price": 13199.99,
    "title": "TREK Madone SLR 9 eTap Gen 7",
    "image": "https://trek.scene7.com/is/image/TrekBicycleProducts/MadoneSLR9eTap_23_37420_B_Primary?$responsive-pjpg$&cache=on,on&wid=1920&hei=1440"
};

describe('getProductById', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    test('should return specific product', async () => {
        const id = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
        const MOCK_EVENT = {
            pathParameters: {
                id
            }
        } as unknown as APIGatewayProxyEvent;

        const response = await getProductById(MOCK_EVENT);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).product).toEqual(MOCK_PRODUCT);
    });

    test('should return 404 error', async () => {
        const MOCK_EVENT = {
            pathParameters: {
                id: undefined
            }
        } as unknown as APIGatewayProxyEvent;

        const response = await getProductById(MOCK_EVENT);

        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).message).toEqual('Product not found');
    });
})