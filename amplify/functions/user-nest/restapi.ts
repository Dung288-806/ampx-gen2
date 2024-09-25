import { Stack } from 'aws-cdk-lib';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IRole, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

type MtkApiProps = {
    lambdaFn: lambda.Function;
    authenticatedUserIamRole: IRole;
    unauthenticatedUserIamRole: IRole;
};
type MtkApiOutput = {
    endpoint: string;
    region: string;
    apiName: string;
};

export class UserNestApi extends Construct {
    public readonly output: MtkApiOutput;
    constructor(scope: Construct, id: string, props: MtkApiProps) {
        super(scope, id);

        // create a new REST API
        const api = new RestApi(this, 'UserNestApi', {
            restApiName: 'UserNestApi',
            deploy: true,
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS, // Restrict this to domains you trust
                allowMethods: Cors.ALL_METHODS, // Specify only the methods you need to allow
                allowHeaders: Cors.DEFAULT_HEADERS, // Specify only the headers you need to allow
            },
        });

        // create a new Lambda integration
        const lambdaIntegration = new LambdaIntegration(props.lambdaFn);

        /**
         * Admin Path
         */
        // create a new resource path for admin with IAM authorization
        const adminPath = api.root.addResource('admin', {
            defaultMethodOptions: {
                // authorizationType: AuthorizationType.IAM,
            },
        });

        // add methods to admin path
        adminPath.addMethod('GET', lambdaIntegration);
        adminPath.addMethod('POST', lambdaIntegration);
        adminPath.addMethod('DELETE', lambdaIntegration);
        adminPath.addMethod('PUT', lambdaIntegration);

        // add a proxy resource path to the API
        adminPath.addProxy({
            anyMethod: true,
            defaultIntegration: lambdaIntegration,
        });

        /**
         * Create Policy for REST API
         */
        // create a new IAM policy to allow Invoke access to the API
        const apiRestPolicy = new Policy(this, 'UserNestApiPolicy', {
            statements: [
                new PolicyStatement({
                    actions: ['execute-api:Invoke'],
                    resources: [`${api.arnForExecuteApi('admin')}`],
                }),
            ],
        });
        // attach the policy to the authenticated and unauthenticated IAM roles
        // props.authenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);
        props.unauthenticatedUserIamRole.attachInlinePolicy(apiRestPolicy);

        // return output
        this.output = {
            endpoint: api.url,
            region: Stack.of(api).region,
            apiName: api.restApiName,
        };
    }
}
