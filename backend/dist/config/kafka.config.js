import fs from "fs";
import { Kafka, logLevel } from "kafkajs";
import path from "path";
import colors from 'colors';
export const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
        ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")]
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: "plain"
    },
    logLevel: logLevel.ERROR
});
export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "default" });
export const connectKafkaProducer = async () => {
    await producer.connect();
    console.log(colors.bgCyan.bold.yellow("Kafka Producer Connected Successfully..."));
};
