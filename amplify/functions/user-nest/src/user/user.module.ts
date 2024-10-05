import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';
import { UserServiceToken } from './userToken.service';

@Module({
    imports: [SequelizeModule.forFeature([Users])],
    controllers: [UserController],
    providers: [
        {
            provide: 'IUserServiceToken',
            useClass: UserServiceToken,
        },
        UserService,
    ],
})
export class UserModule {}
