//send reply email
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
  tls: {
    ciphers: "SSLv3",
  },
});
transport.verify(function (error, success) {
  if (error) {
  } else {
  }
});

function sendMail(subject, email, content) {
  transport
    .sendMail({
      from: process.env.user,
      to: email,
      subject: subject,
      html: content,
    })
    .catch((err) => console.log(err));
}
//send email

exports.sendMail = sendMail;
