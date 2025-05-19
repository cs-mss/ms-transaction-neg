import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';

export class PostgresContainer {
  private static container: StartedPostgreSqlContainer;
  private static isRunning = false;

  static async start(): Promise<{
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
  }> {
    if (!this.isRunning) {
      this.container = await new PostgreSqlContainer()
        .withUsername('test')
        .withPassword('test')
        .withDatabase('testdb')
        .start();

      this.isRunning = true;
    }

    return {
      host: this.container.getHost(),
      port: this.container.getMappedPort(5432),
      database: 'testdb',
      username: 'test',
      password: 'test',
    };
  }

  static async stop(): Promise<void> {
    if (this.isRunning && this.container) {
      await this.container.stop();
      this.isRunning = false;
    }
  }
}
