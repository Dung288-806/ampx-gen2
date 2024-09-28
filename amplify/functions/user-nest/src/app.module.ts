import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import pg from 'pg';

@Module({
    imports: [
        SequelizeModule.forRoot({
            host: process.env.PG_HOST,
            database: process.env.PG_DATABASE,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
            dialect: 'postgres' as Dialect,
            autoLoadModels: true,
            dialectModule: pg,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
