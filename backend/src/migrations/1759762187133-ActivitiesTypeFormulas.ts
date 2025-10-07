import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivitiesTypeFormulas1759762187133 implements MigrationInterface {
    name = 'ActivitiesTypeFormulas1759762187133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity_type\` ADD \`formulas\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImage\` \`profileImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3571467bcbe021f66e2bdce96ea\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_92b8d7ae60a9e36ae170a93b51b\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP COLUMN \`metadata\``);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD \`metadata\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`typeId\` \`typeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3571467bcbe021f66e2bdce96ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_92b8d7ae60a9e36ae170a93b51b\` FOREIGN KEY (\`typeId\`) REFERENCES \`activity_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_92b8d7ae60a9e36ae170a93b51b\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3571467bcbe021f66e2bdce96ea\``);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`typeId\` \`typeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP COLUMN \`metadata\``);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD \`metadata\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_92b8d7ae60a9e36ae170a93b51b\` FOREIGN KEY (\`typeId\`) REFERENCES \`activity_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3571467bcbe021f66e2bdce96ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`profileImage\` \`profileImage\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity_type\` DROP COLUMN \`formulas\``);
    }

}
