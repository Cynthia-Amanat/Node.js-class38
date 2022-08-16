import { app } from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("should test all my weather api end points", () => {
  it("GET / it should return status code 200 for correct city name", async () => {
    const response = await request.get("/");
    expect(response.status).toEqual(200);
  });

  it("GET / it should return status code 404 for correct city name", async () => {
    const response = await request.get("/myWeather");
    expect(response.status).toEqual(404);
  });

  it("POST / it should return status code 200 for correct city name", async () => {
    const options = { cityName: "Karachi" };
    const response = await request
      .post("/weather")
      .set("Accept", "application/json")
      .send(options)
      .expect((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain(options.cityName);
      });
  });

  it("POST / it should return status code 404 for correct city name", async () => {
    const options = { cityName: "lkjasd" };
    const response = await request
      .post("/weather")
      .set("Accept", "application/json")
      .send(options)
      .expect((res) => {
        expect(res.statusCode).toBe(404);
      });
  });
});
