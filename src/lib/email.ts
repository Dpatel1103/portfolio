import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!resendClient && process.env.RESEND_API_KEY) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

function escapeHtml(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendOwlNotification({
  name,
  email,
  message,
  owlType,
  id,
  createdAt
}: {
  name: string;
  email: string;
  message: string;
  owlType?: string;
  id?: number | string;
  createdAt?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NOTIFICATION_EMAIL || 'devanshi1303@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Owl Post <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn('⚠️ [Email] RESEND_API_KEY not configured. Skipping email alert.');
    return { success: false, reason: 'RESEND_API_KEY not configured' };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeOwlType = escapeHtml(owlType || 'Barn Owl');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const dispatchDate = createdAt
    ? new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

  const subject = `✦ New Owl Post: ${name} via ${safeOwlType} ✦`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${subject}</title>
      <style>
        body {
          margin: 0;
          padding: 24px;
          background-color: #f4ebd8;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #2b1d12;
        }
        .parchment-card {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #9c7838;
          border-radius: 6px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(156, 120, 56, 0.15);
        }
        .header-sigil {
          text-align: center;
          color: #9c7838;
          font-size: 16px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .header-title {
          text-align: center;
          font-size: 24px;
          margin: 0 0 24px 0;
          color: #8b1e1e;
          font-weight: normal;
        }
        .divider {
          border: none;
          height: 1px;
          background-color: #9c7838;
          margin: 20px 0;
          opacity: 0.5;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          font-size: 14px;
        }
        .meta-table td {
          padding: 6px 0;
          vertical-align: top;
        }
        .meta-label {
          width: 120px;
          color: #745218;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        .message-box {
          background-color: #faf6ee;
          border-left: 3px solid #8b1e1e;
          padding: 16px 20px;
          font-size: 15px;
          line-height: 1.6;
          color: #2b1d12;
          font-style: italic;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        .action-container {
          text-align: center;
          margin: 28px 0 16px 0;
        }
        .reply-button {
          display: inline-block;
          background-color: #8b1e1e;
          color: #f4ebd8 !important;
          text-decoration: none;
          padding: 10px 22px;
          border-radius: 4px;
          font-size: 14px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: bold;
        }
        .footer-note {
          text-align: center;
          font-size: 12px;
          color: #745218;
          margin-top: 24px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="parchment-card">
        <div class="header-sigil">✦ OWLERIES DISPATCH LEDGER ✦</div>
        <h1 class="header-title">An Owl Has Arrived</h1>

        <table class="meta-table">
          <tr>
            <td class="meta-label">Sender:</td>
            <td><strong>${safeName}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Carrier Owl:</td>
            <td><strong>${safeOwlType}</strong></td>
          </tr>
          <tr>
            <td class="meta-label">Return Owl:</td>
            <td><a href="mailto:${safeEmail}" style="color: #8b1e1e; text-decoration: underline;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td class="meta-label">Dispatched:</td>
            <td>${dispatchDate}</td>
          </tr>
          ${id ? `<tr><td class="meta-label">Scroll ID:</td><td>#${id}</td></tr>` : ''}
        </table>

        <div class="divider"></div>

        <div style="font-weight: bold; color: #745218; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
          Scroll Content:
        </div>
        <div class="message-box">
          ${safeMessage}
        </div>

        <div class="action-container">
          <a href="mailto:${safeEmail}?subject=Re:%20Owl%20Post%20Response%20from%20Devanshi%20Patel" class="reply-button">
            Send Return Owl 🦉
          </a>
        </div>

        <div class="footer-note">
          Dispatched from Devanshi Patel's Portfolio Owl Post System.<br>
          Mischief managed.
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
✦ NEW OWL POST DISPATCH ✦
--------------------------------------------------
Sender:      ${name}
Return Owl:  ${email}
Dispatched:  ${dispatchDate}
Scroll ID:   #${id || 'N/A'}

Message:
${message}
--------------------------------------------------
Reply directly to ${email}
Dispatched from Devanshi Patel's Portfolio.
  `.trim();

  try {
    const resend = getResendClient();
    if (!resend) throw new Error('Resend client unavailable');

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: subject,
      html: htmlContent,
      text: textContent
    });

    console.log(`✦ [Email] Notification owl dispatched to ${toEmail} (ID: ${result.data?.id || 'OK'})`);
    return { success: true, data: result.data };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('✗ [Email] Resend notification failed:', errMsg);
    return { success: false, error: errMsg };
  }
}
