const app = require('./routes')
const request = require('supertest');


describe("GET / ", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200)
    })
})


describe("GET /alumnos", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/alumnos").send();
        expect(response.statusCode).toBe(200)
    })
    test("should respond with a JSON", async () => {
        await request(app).get("/alumnos").send()
        .expect('Content-Type', /json/);
    })
})