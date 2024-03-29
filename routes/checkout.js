
const express = require('express');
const router = express.Router();
const braintree = require('braintree');


  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '6hnmdjfxhrywhbkb',
    publicKey: 'v8czpcqrmp49nd63',
    privateKey: '5bc8af5523d28048d1cdfe2651dac200'
  });

  router.get("/", (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
      res.send(response.clientToken);
    });
  });
  router.post('/', (req, res, next) => {
  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
