// Outbound email via MailDESK (https://maildesk.ng/docs/send). Key stays in env — never in the client.
import { mailConfig } from '../lib/maildesk.js';

export const MAIL = mailConfig(process.env);
