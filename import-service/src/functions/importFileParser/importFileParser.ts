import { S3 } from "aws-sdk";
const csvParser = require('csv-parser')
import { BUCKET_NAME } from "..";
import logger from '../../utils/logger.utils'

export const importFileParser = async (event) => {
    const s3 = new S3({ region: 'eu-west-1' });
    const record = event.Records[0];
    const recordKey: string = record.s3.object.key;

    try {
        const getObjectParams: S3.GetObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: record.s3.object.key,
        }
        const stream = s3.getObject(getObjectParams).createReadStream();

        stream
            .pipe(csvParser())
            .on('error', error => logger.error('Error parsing data', error))
            .on('data', data => logger.log('Data from file', data))

        const copyObjectParams: S3.CopyObjectRequest = {
            Bucket: BUCKET_NAME,
            CopySource: `${BUCKET_NAME}/${recordKey}`,
            Key: recordKey.replace("uploaded", "parsed")
        }
        await s3.copyObject(copyObjectParams, (error, data) => {
            if (error) {
                logger.error('Error copying file from uploaded to parsed', error)
            }
            logger.log('File copied from uploaded to parsed', data)
        }).promise();

        const deleteObjectParams: S3.DeleteObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: recordKey,
        }
        await s3.deleteObject(deleteObjectParams, (error, data) => {
            if (error) {
                logger.error('Error deleting file', error)
            }
            logger.log('File deleted', data)
        }).promise()

    } catch (error) {
        logger.error(error)
    }
}