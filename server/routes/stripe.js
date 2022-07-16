const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SK);

router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: 'setup',
        payment_method_types: ['card'],
        success_url: 'http://localhost:5000/stripe/success?sessionId={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5000/stripe/cancel',
        customer: req.body.stripeId
    });
    res.redirect(session.url);
});

router.get('/success', async (req, res) => {
    // const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    res.redirect('http://localhost:3000/payment');
})

module.exports = router;