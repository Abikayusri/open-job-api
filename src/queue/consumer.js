import 'dotenv/config';

import ApplicationRepositories from "../services/applications/repositories/application-repositories.js";
import MailSender from "./mail-sender.js";
import {APPLICATION_QUEUE, createConnection} from "./producer-service.js";

const RETRY_DELAY_IN_MS = 5000;

const notifyJobOwner = async (message) => {
    const {application_id: applicationId} = JSON.parse(message.content.toString());
    const notification = await ApplicationRepositories.getApplicationNotification(applicationId);

    // Lamaran bisa sudah dihapus sebelum pesan diproses, jadi tidak ada yang perlu diberi tahu.
    if (!notification) {
        console.log(`Lamaran ${applicationId} tidak ditemukan, pesan dilewati`);
        return;
    }

    await MailSender.sendApplicationNotification(notification);
    console.log(`Notifikasi lamaran ${applicationId} terkirim`);
};

const connection = await createConnection();
const channel = await connection.createChannel();

await channel.assertQueue(APPLICATION_QUEUE, {durable: true});
await channel.prefetch(1);

await channel.consume(APPLICATION_QUEUE, async (message) => {
    try {
        await notifyJobOwner(message);
        channel.ack(message);
    } catch (error) {
        console.error(error);
        setTimeout(() => channel.nack(message), RETRY_DELAY_IN_MS);
    }
});

console.log(`Consumer berjalan, menunggu pesan di ${APPLICATION_QUEUE}`);