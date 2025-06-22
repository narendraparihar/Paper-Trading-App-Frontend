export const calculteProfit = (order) => {
  if (order && order.orderItem?.buyPrice && order.orderItem?.sellPrice) {
    return order.orderItem?.sellPrice - order.orderItem?.buyPrice;
  } else {
    console.log(
      order.orderItem?.coin.current_price,
      order.orderItem?.buyPrice,
      "profit cal"
    );
    return order.orderItem?.coin.current_price - order.orderItem?.buyPrice;
  }

  return "-";
};
