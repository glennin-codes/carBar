import Mailgen from "mailgen";

export const sendCredentials = (name:string, email:string, code:number) => {
  // Initialize Mailgen
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'CarBar optimised',
      link: 'https://comradesrentals.vercel.app',
      logo: 'https://imgs.search.brave.com/jUDBL1q0lAoPiM4Y3REgL5E_D4jw35FfxF4oySSr6G4/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4y/MFJiVThQalV1NW9w/OFg3NVFiUURnSGFF/OCZwaWQ9QXBp'
    }
  });
    // Generate the email body with verification URL link and expiration timestamp
    const expirationTime = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    const expirationTimestamp = Date.now() + expirationTime;

const verificationLink = `https://car-hub-five-olive.vercel.app/verifying?email=${email}&code=${code}&e=${expirationTimestamp}`;

  
  // Generate the email content
  const emailContent = {
    body: {
        name: `${name}`,
        intro: `Dear ${name},\n\nThank you for registering for our website! Before you can start using your account, we need to verify your email address. Please click on the following link to complete the verification process:`,
        action: {
          instructions: 'Verification Link:',
          button: {
            color: '#22BC66',
            text: 'Verify Email Address',
            link: verificationLink
          }
        },
        outro: 'Please note that this link is only valid for the next 24 hours. After that, you will need to request a new verification email.\n\nThank you for your cooperation.'
      }
  };
  const emailBody = mailGenerator.generate(emailContent);
  return emailBody;
};