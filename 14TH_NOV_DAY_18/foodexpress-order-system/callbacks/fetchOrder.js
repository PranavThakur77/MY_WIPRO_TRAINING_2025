function fetchOrder(orderId, callback) {
  console.log("Fetching order details...");

  setTimeout(() => {
    const mockDatabase = {
      101: { id: 101, item: "Pizza", amount: 250 },
      102: { id: 102, item: "Burger", amount: 150 }
    };

    const order = mockDatabase[orderId];

    if (!order) {
      return callback("Order not found!", null);
    }

    return callback(null, order);
  }, 1000);
}

module.exports = fetchOrder;
