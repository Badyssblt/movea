import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivityTypeRelation1759495926832 implements MigrationInterface {
    name = 'ActivityTypeRelation1759495926832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`type\` \`typeId\` enum ('running', 'walking', 'cycling', 'yoga', 'gym', 'swimming') NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`activity_type\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_71e01cca515ddd99750868b6e5\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3571467bcbe021f66e2bdce96ea\``);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`calories\` \`calories\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`distance\` \`distance\` decimal(6,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD \`typeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3571467bcbe021f66e2bdce96ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_92b8d7ae60a9e36ae170a93b51b\` FOREIGN KEY (\`typeId\`) REFERENCES \`activity_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_92b8d7ae60a9e36ae170a93b51b\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3571467bcbe021f66e2bdce96ea\``);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD \`typeId\` enum ('running', 'walking', 'cycling', 'yoga', 'gym', 'swimming') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`distance\` \`distance\` decimal(6,2) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`calories\` \`calories\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3571467bcbe021f66e2bdce96ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_71e01cca515ddd99750868b6e5\` ON \`activity_type\``);
        await queryRunner.query(`DROP TABLE \`activity_type\``);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`typeId\` \`type\` enum ('running', 'walking', 'cycling', 'yoga', 'gym', 'swimming') NOT NULL`);
    }

}
