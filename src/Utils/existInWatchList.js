export const existInWatchlist = (items, coin) => {
  console.log(items, coin, "in exist");
  for (let item of items) {
    if (item.id == coin.id) {
      return true;
    }
  }
  return false;
};
