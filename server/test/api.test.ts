import request from "supertest";
import app from "../src/app";

describe("POST /auth/user/signup", () => {
    it("should return 200 OK", () => {
        return request(app).post("/auth/user/signup")
            .expect(200);
    });
});
