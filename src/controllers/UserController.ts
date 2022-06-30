import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { UserModel } from '../models/UserModel';
import { UserService } from '../services/UserService';

@JsonController('/users')
@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  post(@Body() user: UserModel) {
    return this.userService.insert(user);
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: UserModel) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Get('/:id')
  get(@Param('id') id: number) {
    return this.userService.get(id);
  }

  @Get()
  list() {
    return this.userService.list();
  }
}
