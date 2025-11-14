async function generateInvoice(paymentInfo) {
  console.log("Generating invoice...");

  return new Promise((resolve) => {
    setTimeout(() => {
      const invoice = {
        invoiceId: "INV-" + Math.floor(Math.random() * 10000),
        orderId: paymentInfo.orderId,
        amount: paymentInfo.amount,
        message: "Invoice generated successfully"
      };

      resolve(invoice);
    }, 1000);
  });
}

module.exports = generateInvoice;
