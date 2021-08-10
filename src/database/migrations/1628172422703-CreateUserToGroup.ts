import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserToGroup1628172422703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_group",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "group_id",
                        type: "uuid"
                    },
                    {
                        name: "is_admin",
                        type: "boolean"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserIsInGroup",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "FKGroupHasUser",
                        referencedTableName: "groups",
                        referencedColumnNames: ["id"],
                        columnNames: ["group_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
