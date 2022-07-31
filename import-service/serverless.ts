import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'import-service',
    frameworkVersion: '3',
    plugins: [
        'serverless-esbuild',
        'serverless-offline',
        '@martinsson/serverless-openapi-documentation',
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs16.x',
        stage: 'dev',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iamRoleStatements: [
            {
                Effect: "Allow",
                Action: ["s3:ListBucket"],
                Resource: "arn:aws:s3:::import-products-bucket"
            },
            {
                Effect: "Allow",
                Action: ["s3:*"],
                Resource: "arn:aws:s3:::import-products-bucket/*"
            }
        ]
    },
    functions: {
        importProductsFile: {
            handler: './src/handler.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: '/import',
                        cors: true,
                        request: {
                            parameters: {
                                querystrings: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            ]
        },
        importFileParser: {
            handler: './src/handler.importFileParser',
            events: [
                {
                    s3: {
                        bucket: 'import-products-bucket',
                        event: 's3:ObjectCreated:*',
                        rules: [
                            {
                                prefix: 'uploaded/'
                            }
                        ],
                        existing: true
                    }
                }
            ]
        }
    },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
