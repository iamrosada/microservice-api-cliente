import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["top-sunbeam-8449-eu1-kafka.upstash.io:9092"],
  sasl: {
    mechanism: "scram-sha-256",
    username: "dG9wLXN1bmJlYW0tODQ0OSREQjuEgWeShBYjtYGdQYp135zViE757DxCAhnfXhA",
    password: "381b2c5a93d04086a7c22ac71fe5405e",
  },
  ssl: true,
});

export { kafka };
