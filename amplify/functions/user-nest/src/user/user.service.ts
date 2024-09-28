import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectModel(Users) private userModel: typeof Users) {}

    async findOne(): Promise<any> {
        const user = await this.userModel.findOne({
            raw: true,
        });
        console.log('🚀 ~ UserService ~ findOne ~ user:', user);
        return Promise.resolve(
            'This action returns a user' + JSON.stringify(user),
        );
    }
}
