import { User } from '../domain/User';
import { Service } from 'typedi';
import { DataSource } from '../configurations/DataSource';
import { EntityManager } from 'typeorm';
import { UserModel } from '../models/UserModel';
import { Exception } from '../exceptions/Exception';

@Service()
export class UserService {
  private readonly connection: EntityManager;
  constructor() {
    this.connection = DataSource.instance().connection();
  }

  async insert(user: UserModel): Promise<User> {
    //throw new Exception('asdfadsfasdf');
    return new User();
  }

  async update(id: number, user: UserModel): Promise<User> {
    //this.connection.update(user);

    return this.get(id);
  }

  async delete(id: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve('Removing user...');
    });
  }

  async get(id: number): Promise<User> {
    return this.connection.findOneBy(User, { Id: id });
  }

  async list(): Promise<User[]> {
    return this.connection.find(User);
  }
}
