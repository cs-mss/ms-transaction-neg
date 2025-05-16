import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1747365280361 implements MigrationInterface {
    name = 'CreateAllTables1747365280361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certificate" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "dependency" character varying NOT NULL, "amount" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8daddfc65f59e341c2bbc9c9e43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "register" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "description" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "contractDescription" character varying NOT NULL, "thirdParty" character varying NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "certificate_id" integer, CONSTRAINT "PK_14473cc8f2caa81fd19f7648d54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "register" ADD CONSTRAINT "FK_d8c8385c4ede5d548310df3c008" FOREIGN KEY ("certificate_id") REFERENCES "certificate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "register" DROP CONSTRAINT "FK_d8c8385c4ede5d548310df3c008"`);
        await queryRunner.query(`DROP TABLE "register"`);
        await queryRunner.query(`DROP TABLE "certificate"`);
    }

}
