import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST_LOCAL,
  port: parseInt(process.env.DATABASE_PORT_LOCAL || '54032', 10),
  username: process.env.DATABASE_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: [
    'src/context/shared/infrastructure/database/migrations/*.{ts,js}',
  ],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});
