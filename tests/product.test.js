const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const Product = require("../src/models/productModel");

let mongod;

beforeAll(async() => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
});

afterAll(async() => {
    await mongoose.disconnect();
    await mongod.stop();
});

afterEach(async() => {
    await Product.deleteMany({});
});

describe("Inventory API", () => {
    it("should create a product", async() => {
        const res = await request(app)
            .post("/api/products")
            .send({
                name: "Test Product",
                description: "Sample",
                stock_quantity: 5,
                low_stock_threshold: 2
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Test Product");
    });

    it("should increase stock", async() => {
        const product = await Product.create({ name: "P1", stock_quantity: 5 });
        const res = await request(app)
            .patch(`/api/products/${product._id}/increase`)
            .send({ amount: 3 });
        expect(res.statusCode).toBe(200);
        expect(res.body.stock_quantity).toBe(8);
    });

    it("should decrease stock", async() => {
        const product = await Product.create({ name: "P2", stock_quantity: 5 });
        const res = await request(app)
            .patch(`/api/products/${product._id}/decrease`)
            .send({ amount: 2 });
        expect(res.statusCode).toBe(200);
        expect(res.body.stock_quantity).toBe(3);
    });

    it("should not allow stock to go below zero", async() => {
        const product = await Product.create({ name: "P3", stock_quantity: 2 });
        const res = await request(app)
            .patch(`/api/products/${product._id}/decrease`)
            .send({ amount: 5 });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/Insufficient stock/);
    });

    it("should list low stock products", async() => {
        await Product.create({ name: "LowStock", stock_quantity: 1, low_stock_threshold: 5 });
        const res = await request(app).get("/api/products/low-stock");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe("LowStock");
    });
});