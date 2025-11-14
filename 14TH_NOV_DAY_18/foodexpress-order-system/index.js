const fetchOrder = require("./callbacks/fetchOrder");
const processPayment = require("./promises/processPayment");
const generateInvoice = require("./asyncAwait/generateInvoice");


const orderId = 101;

console.log("=== FoodExpress Order Processing System ===");

fetchOrder(orderId, (err, order) => {
  if (err) {
    return console.log("ERROR:", err);
  }

  console.log("Order Fetched:", order);

  processPayment(order)
    .then((paymentInfo) => {
      console.log("Payment Result:", paymentInfo);

      return generateInvoice(paymentInfo);
    })
    .then((invoice) => {
      console.log("Invoice:", invoice);
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
});
