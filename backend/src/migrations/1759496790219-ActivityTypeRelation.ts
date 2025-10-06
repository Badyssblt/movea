import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivityTypeRelation1759496790219 implements MigrationInterface {
    name = 'ActivityTypeRelation1759496790219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_fc087d79002cef578e27dd9fdab\``);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`type_id\` \`typeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` DROP FOREIGN KEY \`FK_3571467bcbe021f66e2bdce96ea\``);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`calories\` \`calories\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`distance\` \`distance\` decimal(6,2) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`distance\` \`distance\` decimal(6,2) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`calories\` \`calories\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_3571467bcbe021f66e2bdce96ea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activity\` CHANGE \`typeId\` \`type_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`activity\` ADD CONSTRAINT \`FK_fc087d79002cef578e27dd9fdab\` FOREIGN KEY (\`type_id\`) REFERENCES \`activity_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
