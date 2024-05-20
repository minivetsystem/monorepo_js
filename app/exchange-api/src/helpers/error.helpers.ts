import { sendEmail } from "./email.helpers";


export async function reportError(error: any, request: any, operation: string, recipient: string, emailServer: string, port: string, username: string, password: string) {
    await sendEmail(
      'report-exchange-error.ejs',
      { 
       error: JSON.stringify(error),
       request: JSON.stringify(request),
       operation: operation || ''
      },
      recipient,
      null,
      null,
      "Error In Exchange",
      null,
      null,
      emailServer,
      port,
      username,
      password);
  }