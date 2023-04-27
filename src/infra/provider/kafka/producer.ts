import { kafka } from ".";

export class KafkaSendMessage {
  /** Execute is method that will send the content to another API
   * @returns will return any content, because we don't know which type content will be  to send
   * @param topic the topic is where i will send the information
   * @param payload it's the info content, that i will send
   */

  async execute(topic: string, payload: any): Promise<void> {
    const producer = kafka.producer({
      allowAutoTopicCreation: true,
    });

    await producer.connect();
    console.log(`MESSAGE SENT TO TOPIC ${topic}`);
    console.log(`MESSAGE PAYLOAD ${payload}`);
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(payload),
        },
      ],
    });
    /**
     *  After send the messages will be disconnect
     */
    await producer.disconnect();
  }
}
