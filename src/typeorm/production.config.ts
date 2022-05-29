import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { TypeOrmNamingStrategy } from "./typeorm-naming-strategy";

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: true,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  retryAttempts: 5,
  namingStrategy: new TypeOrmNamingStrategy(),
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = options; 