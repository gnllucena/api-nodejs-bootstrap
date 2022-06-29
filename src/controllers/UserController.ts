import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseBefore,
} from 'routing-controllers';
import { UserModel } from '../models/UserModel';
import { Service } from 'typedi';
import { UserService } from '../services/UserService';
import { ExceptionHanddlerMiddleware } from '../middlewares/ExceptionHanddlerMiddleware';

@JsonController('/users')
@Service()
// @UseBefore(ExceptionHanddlerMiddleware)
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
