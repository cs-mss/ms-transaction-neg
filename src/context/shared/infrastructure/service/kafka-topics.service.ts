import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaTopicsService implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'admin-client',
    brokers: ['kafka1:9092', 'kafka2:9093', 'kafka3:9094'],
  });

  private readonly topicsToCreate = [
    {
      topic: 'document-created',
      numPartitions: 3,
      replicationFactor: 3,
    },
    {
      topic: 'order-created',
      numPartitions: 3,
      replicationFactor: 3,
    },
  ];

  async onModuleInit() {
    const admin = this.kafka.admin();
    await admin.connect();

    const existingTopics = await admin.listTopics();

    const newTopics = this.topicsToCreate.filter(
      (t) => !existingTopics.includes(t.topic),
    );

    if (newTopics.length > 0) {
      await admin.createTopics({ topics: newTopics });
      console.log(
        'Created topics:',
        newTopics.map((t) => t.topic),
      );
    } else {
      console.log('All topics already exist');
    }

    await admin.disconnect();
  }
}
