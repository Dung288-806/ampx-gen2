import { defineFunction, secret } from '@aws-amplify/backend';

// Gen create a function that takes in a name and returns a greeting
export const userNestFunction = defineFunction({
    name: 'UserNest',
    entry: './handler.ts',
    timeoutSeconds: 60,
    memoryMB: 1024,
    runtime: 20,
    environment: {
        PG_HOST: secret('PG_HOST'),
        PG_DATABASE: secret('PG_DATABASE'),
        PG_USERNAME: secret('PG_USERNAME'),
        PG_PASSWORD: secret('PG_PASSWORD'),
        AWS_SES_ACCESS_KEY_ID: secret('AWS_SES_ACCESS_KEY_ID'),
        AWS_SES_SECRET_ACCESS_KEY: secret('AWS_SES_SECRET_ACCESS_KEY'),
        AWS_SES_REGION: secret('AWS_SES_REGION'),
    },
});
