function processPayment(order) {
  console.log("Processing payment...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const paymentSuccess = true; 

      if (!paymentSuccess) {
        return reject("Payment failed!");
      }

      resolve({
        orderId: order.id,
        status: "Payment Successful",
        amount: order.amount
      });
    }, 1000);
  });
}

module.exports = processPayment;
