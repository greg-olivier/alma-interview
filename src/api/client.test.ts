import { describe, it, expect } from "vitest";
import { apiClient, ApiError } from "./client";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";

describe("createApiClient", () => {
  it("should return parsed JSON for a successful response", async () => {
    server.use(
      http.get("http://test-api/test", () => {
        return HttpResponse.json({ message: "ok" });
      }),
    );

    const data = await apiClient<{ message: string }>("test");
    expect(data.message).toBe("ok");
  });

  it("should throw ApiError with status and message for a 404 response", async () => {
    server.use(
      http.get("http://test-api/not-found", () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    try {
      await apiClient("not-found");
      expect.fail("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
      expect((error as ApiError).message).toBe("API error: 404 on /not-found");
    }
  });

  it("should throw ApiError with status and message for a 500 response", async () => {
    server.use(
      http.get("http://test-api/error", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await apiClient("error");
      expect.fail("should have thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(500);
      expect((error as ApiError).message).toBe("API error: 500 on /error");
    }
  });
});
