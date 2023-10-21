const nodemailer = require("nodemailer");

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mert.9635@gmail.com",
      pass: "asrj toqm gzxw tjjd",
    },
  });

  const mailOptions = {
    from: "example@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Failed: " + error);
    } else {
      console.log("Success: " + info.response);
    }
  });
};

module.exports = {
  sendEmail,
};
