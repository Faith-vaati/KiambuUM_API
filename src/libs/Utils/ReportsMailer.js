const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "mail.dat.co.ke",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(success);
  }
});

function sendMail(subject, email, content) {
  return transport.sendMail({
    from: process.env.user,
    to: [
      process.env.receiver,
      process.env.receiver2,
      process.env.receiver3,
      process.env.receiver4,
      process.env.receiver5,
      process.env.receiver6,
      process.env.receiver7,
      process.env.receiver8,
    ],
    subject: subject,
    html: content,
  });
}
//send email

exports.sendMail = sendMail;
