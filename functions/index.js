// The Cloud Functions for Firebase SDK to create Cloud Functions and
// setup triggers.
const functions = require("firebase-functions");
const adminUid = "LKOVbOpgp1S8wdfyhh95azx5FvO2";
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
require("firebase-functions/logger/compat");

// Nodemailer
const nodemailer = require("nodemailer");
const ses = require("nodemailer-ses-transport");

// Create transporter
const transporter = nodemailer.createTransport(ses({
  accessKeyId: functions.config().aws.ses_access_key,
  secretAccessKey: functions.config().aws.ses_secret_key,
  region: "us-east-1",
}));

const websiteMap = {
  dev: "https://freerangeeggfarm-26736.web.app",
  preprod: "https://freerangeeggfarm-26736.web.app",
  prod: "https://cagefreehub.globalfoodpartners.com",
};

initializeApp();
const admin = getAuth();

function sendEmailToUser(emailData) {
  let body = emailData.intro ? emailData.intro + "<br/><br/>" : "";
  body += emailData.body;

  // emailData = {
  //   emailTo: "daryldsouza123@gmail.com",
  //   emailSubject: "",
  //   intro: "",
  //   body: "",
  //   link: "",
  //   buttonText: ""
  // }

  const emailHtml =
    `
    <html>
      <head>
        <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
      </head>
      <p style="color: #1F1F1F;font-weight: 400;font-size: 14px;line-height: 150%;font-family: 'Roboto';font-style: normal;">
        ${body}
      </p>
      <a href="${emailData.link}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;margin-top:32px; background:#3FAB94;box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);border-radius: 3px; display: inline-block;">
        <p style="margin: 12px 27px 12px 27px; color: #FFFFFF;font-weight: 700;line-height: 150%;font-size: 16px;font-family: 'Roboto';font-style: normal;">
          ${emailData.buttonText}
        </p>
      </a>
      <div style="border: 1px solid #DFE3E9;margin-top:40px"></div>
      <p style="margin-top:40px;color: #1F1F1F;font-weight: 400;font-size: 14px;line-height: 150%;font-family: 'Roboto';font-style: normal;">
        If you have questions or concerns, please email us at <span style="color:#3FAB94">cagefreehub@globalfoodpartners.com</span>
      </p>
    </html>
    `;

  // SEND EMAIL
  transporter.sendMail({
    from: "noreply@globalfoodpartners.com",
    to: emailData.emailTo,
    subject: emailData.emailSubject,
    html: emailHtml,
  },
  function(err, data) {
    if (err) console.log(err);
    return false;
  });
  console.log("sent email to: " + emailData.emailTo);
  return true;
}

exports.sendVerificationEmail = functions.runWith({
  maxInstances: 1,
}).https.onCall((data, context) => {
  // CHECK NOT ALREADY EMAIL VERIFIED && TO OWN EMAIL

  // GET CUSTOM URL
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for
    // this URL must be whitelisted in the Firebase Console. verify page
    url: websiteMap[functions.config().env.stage] + "/verify",
    // This must be true for email link sign-in.
    handleCodeInApp: true,
    // FDL custom domain.
    // dynamicLinkDomain: 'freerangeeggfarm-26736.web.applink',
  };

  admin.generateEmailVerificationLink(context.auth.token.email, actionCodeSettings)
  .then((link) => {
    const emailData = {
      emailTo: context.auth.token.email,
      emailSubject: "You’re almost ready to join the Cage-Free Hub!",
      intro: "",
      body: "Thank you for registering a profile on Global Food Partners’ Cage-Free Hub. To complete your registration, simply click on the button below to verify your email address, and get ready to connect with cage-free buyers and sellers around the globe!",
      link: link,
      buttonText: "Verify email address",
    };

    return sendEmailToUser(emailData);
  })
  .catch((error) => {
    throw new Error(`error generating verification email: ${error}`);
  });
});

exports.adminActionOnStatus = functions.runWith({
  maxInstances: 1,
}).https.onCall((data, context) => {
  if (context.auth.uid !== adminUid) throw new Error("non admin attempted to run function");

  // data = {
  //   isSeller: //needed for all
  //   isApproved: //needed for all
  //   emailTo: //needed for all
  //   name: //needed for all
  //   rejectionReason: //needed when denied
  //   userUid: //needed for approved sellers
  // }

  admin.getUser(data.emailToUid).then((user) => {
    const emailTo = user.email;

    const emailData = {
      emailTo: emailTo,
      emailSubject: "",
      intro: "",
      body: "",
      link: "",
      buttonText: "",
    };

    const website = websiteMap[functions.config().env.stage];
    if (data.isSeller && data.isApproved) { // SELLER APPROVED
      emailData.emailSubject = "Your Cage-Free Hub Profile has been Accepted!";
      emailData.intro = `Dear ${data.name}, Congratulations!`;
      emailData.body = `You have successfully registered your business’s profile on the Cage-Free Hub, a database and resource centre that connects buyers and sellers of cage-free eggs from around the world. Your profile is now live to buyers to view. Log in to the Hub today to start making connections, improving your market visibility, and sharing resources and learning with others like you. Thank you for being a part of our global, cage-free community.`;
      emailData.link = `${website}/profile/${data.userUid}`;
      emailData.buttonText = "Access Cage Free Hub";
    }

    if (data.isSeller && !data.isApproved) { // SELLER DENIED
      emailData.emailSubject = "Your Cage-Free Hub profile needs a few fixes";
      emailData.intro = `Dear ${data.name},`;
      emailData.body = `We were unable to register your business’s profile on the Cage-Free Hub, a database and resource centre that connects buyers and sellers of cage-free eggs from around the world, because the information you provided was incomplete. ${data.rejectionReason}<br/><br/>Finalize your profile today so you can start making connections, improving your market visibility, and sharing resources and learning with others like you. To reaccess your profile submission, access the button below titled “Finalize profile”.`;
      emailData.link = `${website}/profile/welcome`;
      emailData.buttonText = "Finalize profile";
    }

    if (!data.isSeller && data.isApproved) { // BUYER APPROVED
      emailData.emailSubject = "Your Organization has been Approved for Cage-Free Hub!";
      emailData.intro = `Dear ${data.name}, Congratulations!`;
      emailData.body = `You have successfully registered your organization on the Cage-Free Hub, a database and resource centre that connects buyers and sellers of cage-free eggs from around the world. You are now free to explore our directory of cage-free egg sellers. Thank you for being a part of our global, cage-free community.`;
      emailData.link = `${website}/sellers`;
      emailData.buttonText = "Explore the directory";
    }

    if (!data.isSeller && !data.isApproved) { // BUYER DENIED
      emailData.emailSubject = "Your Organization was Denied from Cage-Free Hub (But Please Try Again!)";
      emailData.intro = `Dear ${data.name},`;
      emailData.body = `We were unable to register your organization on the Cage-Free Hub, a database and resource centre that connects buyers and sellers of cage-free eggs from around the world. ${data.rejectionReason}<br/><br/>We’d still love to have you back! If this problem can be remedied, please sign up again through our organization sign up page.`;
      emailData.link = `${website}/buyer-signup`;
      emailData.buttonText = "Access organization sign up page";
    }

    const sent = sendEmailToUser(emailData);
    if (sent) {
      if (!data.isSeller && !data.isApproved) { // delete buyer account if denied
        admin.deleteUser(data.userUid).then(() => {
          console.log('deleted user %s', data.userUid);
        }).catch((error) => {
          console.log('error deleting user %s with error: %s', data.userUid, error);
        });
      }
      return "sent email";
    } else {
      return "failed to send";
    }
  });
});
