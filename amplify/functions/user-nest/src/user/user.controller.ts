import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { UserServiceToken } from './userToken.service';

@Controller('admin')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject('IUserServiceToken')
        private readonly userServiceToken: UserServiceToken,
    ) {}

    @Get('user')
    async getUser(): Promise<string> {
        return await this.userService.findOne();
    }

    @Get('user-token')
    async getUserToken(): Promise<string> {
        return await this.userServiceToken.findOne();
    }
}
