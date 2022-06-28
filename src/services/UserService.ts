import { User } from '../domain/User';
import { Service } from 'typedi';
import { DataSource } from '../configurations/DataSource';
import { EntityManager } from 'typeorm';

@Service()
export class UserService {
  private readonly connection: EntityManager;

  constructor() {
    this.connection = DataSource.instance().configuration().manager;
  }

  async insert(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve('Saving user...');
    });
  }

  async update(id: string, user: User): Promise<User> {
    // this.connection.update(user, )

    return this.get(id);
  }

  async delete(id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve('Removing user...');
    });
  }

  async get(id: string): Promise<User> {
    return this.connection.findOneBy(User, { Id: id });
  }

  async list(): Promise<User[]> {
    return this.connection.find(User);
  }
}
