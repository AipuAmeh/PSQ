import { sendMail } from "./mail.js";
import { resetPasswordTemplate } from "./resetPasswordTemplate.js";

  export const sendPasswordResetEmail = (user, token) => {
    sendMail(
      {
        from: "aipuameh.16@gmail.com",
        to: user.email,
        subject: "PsychQuiConsult: Reset Your Password",
        html: resetPasswordTemplate(token, user.id),
      },
      () => {
        console.log("Password reset email sent.");
      }
    );
  };

