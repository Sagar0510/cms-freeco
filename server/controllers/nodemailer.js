import nodemailer from "nodemailer";
import secret from "../config/secrets.js";

export async function sendMail(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sagarsolanki2000@gmail.com",
      pass: secret.GMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Sagar Singh 👻" <sagarsolanki2000@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Welcome!", // Subject line
    text: "Reset your password to get started!", // plain text body
    html: `
    <h1>click on the below link to reset your password</h1>
    <h3>email : ${data.email}</h3>
    <h3>password : ${data.password}</h3>
    <a href=${data.resetLink}>reset link</a>
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

// sendMail(data).catch(console.error);
