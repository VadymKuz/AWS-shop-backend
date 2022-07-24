import { APIGatewayProxyEvent } from "aws-lambda";
import products from "../../data/products";
import { getProductsList } from "./getProductsList";


describe('Get Products Handler', () => {
    it('should return 200 status code and product list', async () => {
        const MOCK_EVENT = {} as unknown as APIGatewayProxyEvent;

        const response = await getProductsList(MOCK_EVENT);

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).products).toEqual(products);
    });
});