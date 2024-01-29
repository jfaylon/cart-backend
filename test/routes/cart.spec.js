const request = require("supertest");
const app = require("../../app");
jest.mock("../../services/cartService", () => ({
  addOrModifyCart: jest.fn(),
  modifyCart: jest.fn(),
}));

const { addOrModifyCart, modifyCart } = require("../../services/cartService");

describe("Cart", () => {
  describe("GET /cart", () => {
    it("responds with 200 and returns the cart", async () => {
      const response = await request(app).get("/cart").expect(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /cart", () => {
    it("should return the information from addOrModifyCart", async () => {
      const mockedCart = [{ productId: 1, quantity: 2 }];
      addOrModifyCart.mockReturnValue(mockedCart);
      const response = await request(app)
        .post("/cart")
        .send({ item: { productId: 1, quantity: 2 } });
      expect(response.body).toEqual(mockedCart);
    });
  });
  describe("PATCH /cart", () => {
    it("should return the information from modifyCart", async () => {
      const mockedCart = [{ productId: 1, quantity: 3 }];
      modifyCart.mockReturnValue(mockedCart);

      const response = await request(app)
        .patch("/cart/1")
        .send({ item: { productId: 1, quantity: 3 } });
      expect(response.body).toEqual(mockedCart);
    });
  });
});
