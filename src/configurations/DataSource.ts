import { DataSource as DataSourceTypeOrm, EntityManager, QueryRunner } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const source = new DataSourceTypeOrm({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_HOST),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  entities: ['src/domain/*.ts'],
  migrations: ['migrations/*.ts'],
});

export class DataSource {
  private static _instance: DataSource;
  private _dataSource: DataSourceTypeOrm;

  private constructor() {
    this._dataSource = source;
  }

  public static instance(): DataSource {
    if (!DataSource._instance) {
      DataSource._instance = new DataSource();
    }

    return DataSource._instance;
  }

  public source(): DataSourceTypeOrm {
    return this._dataSource;
  }

  public runner(): QueryRunner {
    return this._dataSource.createQueryRunner();
  }

  public connection(): EntityManager {
    return this._dataSource.manager;
  }
}
