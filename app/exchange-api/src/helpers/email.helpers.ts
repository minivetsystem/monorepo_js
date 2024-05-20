//import { MailtrapClient } from "mailtrap";
import nodemailer from 'nodemailer';
import ejs from 'ejs';

export async function sendEmail(template_name: string,
                                body: any,
                                recipient_email: string,
                                cc_email: string,
                                bcc_email: string,
                                subject: string,
                                attach_filename: string,
                                attach_filepath: string,
                                sendGridEmailServer: string,
                                sendGridEmailPort: string,
                                sendGridEmailUsername: string,
                                sendGridEmailPassword: string){

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: sendGridEmailServer,
    port: sendGridEmailPort,
    secure: false, // true for 465, false for other ports
    auth: {
      user: sendGridEmailUsername, // generated ethereal user
      pass: sendGridEmailPassword, // generated ethereal password
    },
  });

  const data = await ejs.renderFile(__dirname + `/assets/email-templates/${template_name}`, body);

  const options = {
    from: `"Astoria Company " tech@astoriacompany.com`, // sender address
    to: recipient_email, // list of receivers
    cc: cc_email, // list of Cc email ids
    bcc: bcc_email, // list of Bcc email ids
    subject, // Subject line
    html: data, // html body
    attachments: []
  }

  if(attach_filename) {
    options.attachments = [{
        filename: attach_filename,
        path: attach_filepath
    }]
  }

  const info = await transporter.sendMail(options);

  return info.messageId ? true : false;
}
