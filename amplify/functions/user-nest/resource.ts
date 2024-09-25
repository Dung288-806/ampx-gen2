import { defineFunction } from '@aws-amplify/backend';

// Gen create a function that takes in a name and returns a greeting
export const userNestFunction = defineFunction({
    name: 'UserNest',
    entry: './handler.ts',
    timeoutSeconds: 60,
    memoryMB: 1024,
    runtime: 20, // use node v20
});
