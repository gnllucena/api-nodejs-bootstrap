import { User } from '../domain/User';
import { Service } from 'typedi';

@Service()
export class UserService {
  async insert(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return 'Saving user...';
    });
  }

  async update(id: number, user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return 'Updating a user...';
    });
  }

  async delete(id: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return 'Removing user...';
    });
  }

  async get(id: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return 'This action returns user #' + id;
    });
  }

  async list(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return 'This action returns all users';
    });
  }
}
