const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

async function sendEmail(email, username, emailType) {
  let htmlContent;

  // Conditionally generate HTML content based on emailType
  if (emailType === "register") {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dce3eb; border-radius: 10px; background-color: #f9fbfc;">
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="https://dedhehftwwfuaerrfecb.supabase.co/storage/v1/object/public/logo/Logo.png?t=2024-05-17T09%3A11%3A27.399Z" alt="MyContacts Logo" style="max-width: 100px;"/>
        </div>
        <h2 style="color: #333; text-align: center;">Welcome to MyContacts, ${username}!</h2>
        <p style="color: #555; text-align: justify;">
          We're thrilled to have you on board. MyContacts is here to help you build and manage your personal phonebook with ease.
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://mycontactsapp.vercel.app" style="text-decoration: none; padding: 10px 20px; color: white; background-color: #007BFF; border-radius: 5px;">Get Started</a>
        </div>
        <p style="color: #555; text-align: center;">If you have any questions, feel free to <a href="https://mycontactsapp.vercel.app/contact" style="color: #007BFF;">contact us</a>.</p>
        <p style="color: #999; text-align: center; font-size: 12px;">
          &copy; 2024 MyContacts. All rights reserved.<br>
          MyContacts, Surat City, Gujarat
        </p>
      </div>
    `;
  } else if (emailType === "login") {
    htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dce3eb; border-radius: 10px; background-color: #f9fbfc;">
        <div style="text-align: center; padding-bottom: 20px;">
          <img src="https://dedhehftwwfuaerrfecb.supabase.co/storage/v1/object/public/logo/Logo.png?t=2024-05-17T09%3A11%3A27.399Z" alt="MyContacts Logo" style="max-width: 100px;"/>
        </div>
        <h2 style="color: #333; text-align: center;">Hello, ${username}!</h2>
        <p style="color: #555; text-align: center;">
          We're glad to see you back. Login Successfully!.
        </p>
        <p style="color: #555; text-align: center;">If you have any questions, feel free to <a href="https://mycontactsapp.vercel.app/contact" style="color: #007BFF;">contact us</a>.</p>
        <p style="color: #999; text-align: center; font-size: 12px;">
          &copy; 2024 MyContacts. All rights reserved.<br>
          MyContacts, Surat City, Gujarat
        </p>
      </div>
    `;
  } else {
    throw new Error("Invalid email type");
  }

  const info = await transporter.sendMail({
    from: '"MyContacts" <' + process.env.USER_EMAIL + ">",
    to: email,
    subject:
      emailType === "register"
        ? "Welcome to MyContacts"
        : "Login to MyContacts", // Subject line
    html: htmlContent, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return info.messageId;
}

module.exports = { sendEmail };
