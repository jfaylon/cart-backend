const addOrModifyCart = (cart, item) => {
  let newCart = cart;
  const existingItem = cart.find((cartItem) => {
    return cartItem.id === item.id;
  });
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  newCart = cart.filter((cartItem) => {
    return cartItem?.quantity > 0;
  });
  return newCart;
};

const modifyCart = (cart, id, quantity) => {
  let newCart = cart;
  const existingItem = cart.find((cartItem) => {
    return cartItem.id === Number.parseInt(id);
  });
  if (existingItem) {
    existingItem.quantity += quantity;
  }
  newCart = cart.filter((cartItem) => {
    return cartItem?.quantity > 0;
  });
  return newCart;
};
module.exports = {
  addOrModifyCart,
  modifyCart,
};
