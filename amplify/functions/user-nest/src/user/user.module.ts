import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';

@Module({
    imports: [SequelizeModule.forFeature([Users])],
    controllers: [UserController],
    providers: [
        {
            provide: 'IUserService',
            useClass: UserService,
        },
    ],
})
export class UserModule {}
