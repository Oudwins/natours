const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

// usage => new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Natours ${process.env.EMAIL_FROM}`;
  }

  createTransporter() {
    if (process.env.NODE_ENV === 'production') {
      //create transporter for sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // ELSE IF IN DEVELOPMENT
    return nodemailer.createTransport({
      host: process.env.DEV_EMAIL_HOST,
      port: process.env.DEV_EMAIL_PORT,
      auth: {
        user: process.env.DEV_EMAIL_USERNAME,
        pass: process.env.DEV_EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) RENDER HTML for email based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        url: this.url,
        firstName: this.firstName,
        subject,
      }
    );
    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html: html,
      text: htmlToText(html),
    };
    // 3) create a transport and send email
    await this.createTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Reset your Natours Password (valid for only 10 minutes)'
    );
  }
};
/* const sendEmailGmail options => {
 //1. Create transporter
 const transporter = nodemailer.createTransporter({
  service: 'Gmail',
  auth: {
  user: process.env.EMAIL_USERNAME,
  password: process.env.EMAIL_PASSWORD
  }
 })
 //2. define email options

 //3. send email
} */

/* module.exports = async (options) => {
  //1. Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2. define email options
  const mailOptions = {
    from: 'Tristan Mayo <tristanmayofreire@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3. send email
  await transporter.sendMail(mailOptions);
};
 */
