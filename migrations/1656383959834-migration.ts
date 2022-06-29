import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class migration1656383959834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(80)',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar(80)',
          },
          {
            name: 'password',
            type: 'varchar(100)',
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'file',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar(80)',
          },
          {
            name: 'path',
            type: 'varchar(200)',
          },
          {
            name: 'status',
            type: 'varchar(20)',
          },
        ],
      })
    );

    const fk = new TableForeignKey({
      name: 'fk_file_user',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
    });

    await queryRunner.createForeignKey('file', fk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('file', 'fk_file_user');
    await queryRunner.dropTable('file');
    await queryRunner.dropTable('user');
  }
}
