const nodemailer = require("nodemailer");

const mailSender = async () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "hujii0711@gmail.com",
      pass: "dlgtyzzjblnkrzqx",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "WDMA Team <hujii0711@gmail.com>",
    to: "fujii0711@daum.net",
    subject: "노드 이메일 테스트 제목",
    text: "노드 이메일 테스트 내용",
    html: `<b>노드 이메일 테스트 HTML</b>`,
  });
  console.log("Message sent: %s", info.messageId);

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //   res.status(200).json({
  //     status: "Success",
  //     code: 200,
  //     message: "Sent Auth Email",
  //   });
};

mailSender().catch("ERROR========================", console.error);
module.exports = mailSender;
