const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.firstname = user.name.split(' ')[0];
    this.url = url;
    this.to = user.email;
    this.from = `365gainfuldice <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstname: this.firstname,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to 365gainfuldice');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendNewMember() {
    await this.send('newMember', 'New member alert');
  }

  async sendEmailVerify() {
    await this.send('emailVerify', 'Verify your email address');
  }

  async sendAdmin365MembershipAlert() {
    await this.send('membership', 'New player upgraded to 365CLUB');
  }

  async sendAdminWithdrawAlert() {
    await this.send('withdrawal', 'Withdraw request alert');
  }

  async sendUser365SubAlert() {
    await this.send('membershipAlert', 'Your 365CLUB membership subscription');
  }

  async sendUserTopupAlert() {
    await this.send('topupAlert', 'Successful despoit');
  }

  async sendAdminTopupAlert() {
    await this.send('topup', 'Top up alert');
  }
};
