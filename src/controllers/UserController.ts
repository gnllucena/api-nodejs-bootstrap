import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { User } from '../domain/User';
import { UserService } from '../services/UserService';

@JsonController('/users')
export class UserController {
  constructor(public userService: UserService) {}

  @Post()
  post(@Body() user: User) {
    return this.userService.insert(user);
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() user: User) {
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
