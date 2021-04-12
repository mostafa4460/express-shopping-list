process.env.NODE_ENV = "test";

const request = require("supertest"),
    app = require("../app");

let list = require("../fakeDb");
let item = {name: "toilet paper", price: 1.5}

beforeEach(() => {
    list.push(item);
})

afterEach(() => {
    // reset fakeDb without mutating it
    list.length = 0;
})

/** GET /items - get list of all items; [{name: [itemName], price: [itemPrice]}] */

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([item]);
    })
})

/** POST /items - adds new item to shopping list; {added: {name: [itemName], price: [itemPrice]}} */

describe("POST /items", () => {
    test("Add new item to shopping list", async () => {
        const res = await request(app).post("/items").send({name: "poptarts", price: 2});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
            added: {name: "poptarts", price: 2}
        });
        expect(list.length).toBe(2);
    })
})

/** GET /items/:name - get a specific item in the list; {name: [itemName], price: [itemPrice]} */

describe("GET /items/:name", () => {
    test("Get a specific item by name", async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(item);
    })
})

/** PATCH /items/:name - update an item in the list; {updated: {name: [newName], price: [newPrice]}} */

describe("PATCH /items/:name", () => {
    test("Update an item in the list", async () => {
        const res = await request(app).patch(`/items/${item.name}`)
            .send({name: "toilet paperz", price: 99});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            updated: {name: "toilet paperz", price: 99}
        });
    })
})

/** DELETE /items/:name - delete an item in the list; {message: "Deleted"} */

describe("DELETE /items/:name", () => {
    test("Delete an item in the list", async () => {
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"});
        expect(list.length).toBe(0);
    })
})