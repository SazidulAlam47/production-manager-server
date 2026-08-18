import nodemailer from 'nodemailer';
import config from '../config';
import status from 'http-status';
import ApiError from '../errors/ApiError';

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.node_mailer.email,
                pass: config.node_mailer.password,
            },
        });

        await transporter.sendMail({
            from: `"StudyPilot" <${config.node_mailer.email}>`,
            to,
            subject,
            html,
        });
    } catch {
        throw new ApiError(
            status.INTERNAL_SERVER_ERROR,
            'Failed to send Email',
        );
    }
};

export default sendEmail;
