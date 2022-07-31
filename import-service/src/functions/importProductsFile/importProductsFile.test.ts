import { APIGatewayProxyEvent } from "aws-lambda"
import { BUCKET_NAME, importProductsFile } from "./importProductsFile"

describe("importProductsFile Lambda", () => {
    it("should return 200 status and created url", async () => {
        const result = await importProductsFile({ queryStringParameters: { name: "file.csv" } } as unknown as APIGatewayProxyEvent);

        expect(result.statusCode).toEqual(200);
        expect(JSON.parse(result.body)).toContain(`https://${BUCKET_NAME}.s3.eu-west-1.amazonaws.com`)
    })

    it("should return an error", async () => {
        const result = await importProductsFile({} as unknown as APIGatewayProxyEvent);

        expect(result.statusCode).toEqual(500);
        expect(JSON.parse(result.body)).toMatchObject({ statusCode: 500, message: "Cannot read properties of undefined (reading 'name')" })
    })
})