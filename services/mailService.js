const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html = "") => {
    try {
        const msg = {
            to,
            from: {
                email: process.env.EMAIL_FROM, // Sender email
                name: "Nodejs Tutorials", // Set the custom sender name here
            },
            subject,
            text,
            html,
        };
        await sgMail.send(msg);
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error.message);
        throw new Error("Email sending failed");
    }
};

module.exports = { sendEmail };
