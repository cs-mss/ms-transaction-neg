import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  name: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.POSTGRES_PASSWORD,
}));
