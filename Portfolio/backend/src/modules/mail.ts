import nodemailer from 'nodemailer';

const mailSender = async (bodys: { to: string; subject: string; html: string }) => {
  const { to, subject, html } = bodys;

  const mailConfig = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hujii0711@gmail.com',
      pass: 'dlgtyzzjblnkrzqx',
    },
  };

  const message = {
    from: 'WDMA Team <hujii0711@gmail.com>',
    to,
    subject,
    html,
  };

  try {
    const info = await nodemailer.createTransport(mailConfig).sendMail(message);
    return info;
  } catch (err) {
    return { status: 'fail', message: err };
  }
};

export default mailSender;
