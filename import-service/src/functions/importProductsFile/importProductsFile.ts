import { APIGatewayProxyEvent } from 'aws-lambda';
import { S3 } from 'aws-sdk'
import { handler } from '../../utils/handler.utils';
export const BUCKET_NAME = 'import-products-bucket'

export const importProductsFile = handler(async (event: APIGatewayProxyEvent) => {
    const s3 = new S3({ region: 'eu-west-1' });
    const fileName = event.queryStringParameters.name;
    const filePath = `uploaded/${fileName}`;
    const params = {
        Bucket: BUCKET_NAME,
        Key: filePath,
        Expires: 60,
        ContentType: 'text/csv',
    }

    return await s3.getSignedUrlPromise('putObject', params);
})

