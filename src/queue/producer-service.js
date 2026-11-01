import amqp from "amqplib";

export const APPLICATION_QUEUE = 'application:created';

export const createConnection = () => amqp.connect({
    protocol: 'amqp',
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
});

const ProducerService = {
    sendMessage: async (queue, message) => {
        const connection = await createConnection();

        try {
            const channel = await connection.createConfirmChannel();

            await channel.assertQueue(queue, {durable: true});
            channel.sendToQueue(queue, Buffer.from(message), {persistent: true});
            await channel.waitForConfirms();
        } finally {
            await connection.close();
        }
    }
};

export default ProducerService;