const express = require("express");
const request = require("supertest");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

const app = require("../../app");
const mock = new MockAdapter(axios);

describe("Products", () => {
  afterEach(() => {
    mock.reset();
  });
  it("should respond with products", async () => {
    const mockedProducts = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];
    mock.onGet("https://fakestoreapi.com/products").reply(200, mockedProducts);

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(mockedProducts);
  });

  it('should respond with categories', async () => {
    const mockedCategories = ['test 1', 'test2'];
    mock.onGet("https://fakestoreapi.com/products/categories").reply(200, mockedCategories);

    const response = await request(app).get('/products/categories');
    
    expect(response.status).toBe(200);
    expect(response.body.categories).toEqual(mockedCategories);
  });

  it('should respond with products for a specific category', async () => {
    const category = 'Category1';
    const mockedProducts = [{ id: 1, title: 'Product 1' }, { id: 2, title: 'Product 2' }];
    mock.onGet(`https://fakestoreapi.com/products/category/${category}`).reply(200, mockedProducts);

    const response = await request(app).get(`/products/categories/${category}`);
    
    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(mockedProducts);
  });

  it('should respond with a specific product', async () => {
    const productId = '1';
    const mockedProduct = { id: 1, title: 'Product 1' };
    mock.onGet(`https://fakestoreapi.com/products/${productId}`).reply(200, mockedProduct);

    const response = await request(app).get(`/products/${productId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedProduct);
  });
});
