import nodemailer from "nodemailer";

const port = Number(process.env.MAIL_PORT);

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure: port === 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    }
});

const MailSender = {
    sendApplicationNotification: (
        {
            owner_email: ownerEmail,
            applicant_name: applicantName,
            applicant_email: applicantEmail,
            applied_at: appliedAt,
            job_title: jobTitle
        }
    ) => transporter.sendMail(
        {
            from: '"OpenJob" <no-reply@openjob.test>',
            to: ownerEmail,
            subject: `Lamaran baru untuk ${jobTitle}`,
            text: [
                `Ada lamaran baru untuk lowongan ${jobTitle}.`,
                '',
                `Nama Pelamar: ${applicantName}`,
                `Email Pelamar: ${applicantEmail}`,
                `Tanggal Lamaran: ${appliedAt.toLocaleString('id-ID')}`,
            ].join('\n'),
        }
    )
};

export default MailSender;