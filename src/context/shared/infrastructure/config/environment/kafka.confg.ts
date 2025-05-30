import { registerAs } from '@nestjs/config';

export default registerAs('kafka', () => ({
  brokers: process.env.KAFKA_BROKERS,
  host: process.env.KAFKA_CLIENT_ID,
  port: process.env.KAFKA_GROUP_ID,
}));
