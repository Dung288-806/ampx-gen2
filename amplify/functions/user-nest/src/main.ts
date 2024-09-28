import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    console.log('process.env.PG_HOST', process.env.PG_HOST);

    await app.listen(3000);
}
bootstrap();
