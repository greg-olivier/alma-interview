import { describe, it, expect, vi } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  it("should log error to console", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("test");

    logger.error(error);

    expect(spy).toHaveBeenCalledWith("[Error]", error, undefined);
  });

  it("should log error with context", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("test");
    const context = { componentStack: "at App" };

    logger.error(error, context);

    expect(spy).toHaveBeenCalledWith("[Error]", error, context);
  });
});
