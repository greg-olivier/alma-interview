export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export class NetworkError extends Error {
  constructor(endpoint: string, cause?: unknown) {
    super(`Network error on /${endpoint}`);
    this.name = "NetworkError";
    this.cause = cause;
  }
}

function getBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("VITE_API_BASE_URL environment variable is not defined");
  }

  return baseUrl;
}

export function createApiClient(baseUrl: string) {
  return async function apiClient<T>(endpoint: string): Promise<T> {
    let response: Response;

    try {
      response = await fetch(`${baseUrl}/${endpoint}`);
    } catch (error) {
      throw new NetworkError(endpoint, error);
    }

    if (!response.ok) {
      throw new ApiError(response.status, `API error: ${response.status} on /${endpoint}`);
    }

    try {
      const data = await response.json();
      return data as T;
    } catch {
      throw new ApiError(response.status, `Invalid JSON response on /${endpoint}`);
    }
  };
}

export const apiClient = createApiClient(getBaseUrl());
