const functions = require("firebase-functions");
const express = require("express");
const sgMail = require("@sendgrid/mail");
const app = express();
const cors = require("cors");

// change to your domain/s

const corsOptions = {
  origin: function(origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
    // eslint-disable-next-line callback-return
    callback(null, true);
    // } else {
    //   // eslint-disable-next-line callback-return
    //   callback(new Error("Not allowed by CORS"));
    // }
  },
};

app.get("/", cors(corsOptions), function(request, response, next) {
  sgMail.setApiKey(functions.config().sendgrid.key);

  const from = "yourSingleSenderEmailAddrss"; // Change to your verified sender

  const {to, subject, text} = request.query;

  const msg = {
    to,
    from,
    subject,
    text,
    html: `<strong>${text}</strong>`,
  };

  sgMail
      .send(msg)
      .then(() => {
        response.status(200).send("Email sent");
      })
      .catch((error) => {
        response.status(500).send(error);
      });
});
exports.email = functions.https.onRequest(app);
