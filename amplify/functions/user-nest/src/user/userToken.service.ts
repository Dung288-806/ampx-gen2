import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';

@Injectable()
export class UserServiceToken {
    constructor(@InjectModel(Users) private userModel: typeof Users) {}

    async findOne(): Promise<any> {
        const user = {
            id: 1,
        };
        console.log('🚀 ~ UserServiceToken ~ findOne ~ user:');
        return Promise.resolve(
            'This action returns a UserServiceToken ' + JSON.stringify(user.id),
        );
    }
}
