export const ChatAppWelcomeEmail = (username, clientUrl) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome to ChatApp!</title>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f0f2f5;">
    <div style="max-width:600px;margin:30px auto;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #ddd;">
      
      <!-- Header -->
      <div style="background-color:#25D366;color:#ffffff;text-align:center;padding:20px;font-size:24px;font-weight:bold;">
        Welcome to ChatApp!
      </div>

      <!-- Content -->
      <div style="padding:30px 20px;color:#333333;line-height:1.6;">
        <h1 style="color:#25D366;font-size:22px;margin-top:0;">Hi ${username}!</h1>
        <p style="margin:10px 0;">You’ve successfully joined ChatApp — your new place to connect with friends and family instantly.</p>
        <p style="margin:10px 0;">Start chatting now and explore all the awesome features we offer:</p>
        <ul style="margin:10px 0 20px 20px;">
          <li>One-to-one chats and group conversations</li>
          <li>Send images, emojis, and voice notes</li>
          <li>Secure end-to-end encryption</li>
        </ul>
        <a href="${clientUrl}" 
           style="display:inline-block;margin-top:20px;padding:12px 25px;background-color:#25D366;color:#ffffff;text-decoration:none;border-radius:5px;font-weight:bold;">
          Start Chatting
        </a>
        <p style="margin:15px 0 0 0;">If you have any questions, just reply to this email — we’re here to help!</p>
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:15px 20px;font-size:12px;color:#777777;background-color:#f0f2f5;">
        &copy; 2026 ChatApp. All rights reserved.
      </div>

    </div>
  </body>
  </html>
  `;
};
