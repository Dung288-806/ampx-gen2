import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('admin')
export class UserController {
    constructor(
        @Inject('IUserService') private readonly userService: UserService,
    ) {}

    @Get()
    async getHello(): Promise<string> {
        return await this.userService.findOne();
    }
}
