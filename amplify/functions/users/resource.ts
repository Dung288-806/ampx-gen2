import { defineFunction } from '@aws-amplify/backend';

// Gen create a function that takes in a name and returns a greeting
export const userExpressFunction = defineFunction({
    name: 'UserExpress',
    entry: './handler.ts',
});
