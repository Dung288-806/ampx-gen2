import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(Users) private userModel: typeof Users) {}

    async findOne(): Promise<any> {
        const user = {
            id: 1,
        };
        console.log('🚀 ~ UserService ~ findOne ~ user:', user);
        return Promise.resolve(
            'This action returns a user UserService ' + JSON.stringify(user.id),
        );
    }
}
