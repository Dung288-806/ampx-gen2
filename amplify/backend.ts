import { defineBackend } from '@aws-amplify/backend';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { auth } from './auth/resource';
import { userNestFunction } from './functions/user-nest/resource';
import { UserNestApi } from './functions/user-nest/restapi';

import { userExpressFunction } from './functions/users/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
    auth,
    userExpressFunction,
    userNestFunction,
});

/**
 * Create MTK Backend Stack
 */
const mtkBackendStack = backend.createStack('MtkBackendStack');

/**
 * Create Loyalty API
 */
const userNestApi = new UserNestApi(mtkBackendStack, 'UserNestApi', {
    lambdaFn: backend.userNestFunction.resources.lambda as lambda.Function,
    authenticatedUserIamRole: backend.auth.resources.authenticatedUserIamRole,
    unauthenticatedUserIamRole:
        backend.auth.resources.unauthenticatedUserIamRole,
});

// add outputs to the configuration file
backend.addOutput({
    custom: {
        API: {
            [userNestApi.output.apiName]: {
                endpoint: userNestApi.output.endpoint,
                region: userNestApi.output.region,
                apiName: userNestApi.output.apiName,
            },
        },
    },
});
