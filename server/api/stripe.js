const router = require('express').Router();
const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const Stripe = require('stripe');

const stripe = new Stripe(stripeSecretKey);

router.post('/charge', async (req, res, next) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.send(paymentIntent.client_secret);
  } catch (err) {
    next(err);
  }
});

router.post('/email', async (req, res, next) => {
  try {
    const { email, emailText, subject } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "paulmneenantest@gmail.com",
        pass: process.env.PASS
      },
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"paulpaulpaul" <paulmneenantest@gmail.com>',
      to: email,
      subject,
      html: emailText,
    });

    console.log('message sent', info.messageId);
    res.sendStatus(200);
  } catch (err) { next(err); }
});

module.exports = router;
