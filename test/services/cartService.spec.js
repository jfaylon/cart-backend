const { addOrModifyCart, modifyCart } = require("../../services/cartService");
describe("cartService", () => {
  describe("addOrModifyCart", () => {
    it("should add item to cart", () => {
      const cart = [];
      const item = {
        quantity: 1,
        id: 1,
      };
      const newCart = addOrModifyCart(cart, item);
      expect(newCart.length).toEqual(1);
    });
    it("should add quantity to existing item to cart", () => {
      const cart = [
        {
          quantity: 1,
          id: 1,
        },
      ];
      const item = {
        quantity: 2,
        id: 1,
      };
      const newCart = addOrModifyCart(cart, item);
      expect(newCart.length).toEqual(1);
      expect(newCart[0].quantity).toEqual(3);
    });
    it("should remove the item from cart when the quantity reaches 0", () => {
      const cart = [
        {
          quantity: 1,
          id: 1,
        },
      ];
      const item = {
        quantity: -1,
        id: 1,
      };
      const newCart = addOrModifyCart(cart, item);
      expect(newCart.length).toEqual(0);
    });
  });
  describe("modifyCart", () => {
    it("should modify quantity of existing item", () => {
      const initialCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 1 },
      ];
      const itemId = 2;
      const quantity = 2;
      const expectedCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 5 },
        { id: 3, quantity: 1 },
      ];

      const result = modifyCart([...initialCart], itemId, quantity);
      expect(result).toEqual(expectedCart);
    });
    it("should do nothing", () => {
      const initialCart = [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
      ];
      const itemId = 2;
      const quantity = 3;
      const expectedCart = [
        { id: 1, quantity: 2 },
        { id: 3, quantity: 1 },
      ];

      const result = modifyCart([...initialCart], itemId, quantity);
      expect(result).toEqual(expectedCart);
    });
    it("should remove an item from the cart", () => {
      const initialCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
        { id: 3, quantity: 1 },
      ];
      const itemId = 3;
      const quantity = -1;
      const expectedCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
      ];

      const result = modifyCart([...initialCart], itemId, quantity);
      expect(result).toEqual(expectedCart);
    });
  });
});
