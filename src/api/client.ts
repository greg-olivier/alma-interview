export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
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
    const response = await fetch(`${baseUrl}/${endpoint}`);

    if (!response.ok) {
      throw new ApiError(response.status, `API error: ${response.status} on /${endpoint}`);
    }

    return response.json() as Promise<T>;
  };
}

export const apiClient = createApiClient(getBaseUrl());
