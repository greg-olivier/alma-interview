import { describe, it, expect, vi } from "vitest";
import { logger } from "@/lib/logger";
import { queryClient } from "./query-client";

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn() },
}));

describe("queryClient", () => {
  it("should log errors through the logger", async () => {
    const error = new Error("API error");

    await queryClient.prefetchQuery({
      queryKey: ["test"],
      queryFn: () => {
        throw error;
      },
    });

    expect(logger.error).toHaveBeenCalledWith(
      error,
      expect.objectContaining({ source: "query", queryKey: '["test"]' }),
    );
  });
});
