const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const nodemailer = require('nodemailer');
require('dotenv').config();

const SENDGRID_USER = process.env.SENDGRID_USER;
const SENDGRID_PASS = process.env.SENDGRID_PASS;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//allow body-parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!"});
});

// Handle resume download requests.
app.get("/resume", (req, res) => {
  res.download(__dirname + '/ResumeApr2021.pdf');
});

// POST route from contact form
app.post('/contact', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    server: 'smtp.sendgrid.net',
    port: 465,
    username: SENDGRID_USER,
    password: SENDGRID_PASS
  })

  // Specify what the email will look like
  const mailOpts = {
    from: 'Your sender info here', // This is ignored by Gmail
    to: SENDGRID_USER,
    subject: 'New message from contact form at harrisonking.dev',
    text: `${req.body.contactName} (${req.body.contactEmail}) says: ${req.body.contactSubject}: ${req.body.contactMessage}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('contact-failure') // Show a page indicating failure
    }
    else {
      res.render('contact-success') // Show a page indicating success
    }
  })
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//look for templates you can model it after, look at an open source option.

/* 
https://harrison-king-portfolio.herokuapp.com/
to update site:

git add .
git commit -m "my commit message"
git push heroku master
*/
