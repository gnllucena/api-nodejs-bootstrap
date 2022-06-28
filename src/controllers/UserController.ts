import { JsonController, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '../domain/User';
import { UserService } from '../services/UserService';

@JsonController('/users')
@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  post(@Body() user: User) {
    return this.userService.insert(user);
  }

  @Put('/:id')
  put(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.userService.get(id);
  }

  @Get()
  list() {
    return this.userService.list();
  }
}
