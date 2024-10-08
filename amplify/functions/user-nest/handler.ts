import serverlessExpress from '@codegenie/serverless-express';
import { NestFactory } from '@nestjs/core';
import { Callback, Context, Handler } from 'aws-lambda';
import * as apiMapping from './api-mapping';
import { AppModule } from './src/app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({
        app: expressApp,
        eventSource: {
            getRequest: apiMapping.requestMapper,
            getResponse: apiMapping.responseMapper,
        },
        logSettings: {
            level: 'debug',
        },
    });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
