import { type PropsWithChildren, type ReactElement } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import type { Options, UserEvent } from "@testing-library/user-event";
import { userEvent } from "@testing-library/user-event";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
}

function createWrapper() {
  const queryClient = createTestQueryClient();

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
}

interface RenderResultWithUserEvent extends RenderResult {
  user: UserEvent;
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  userEventSetupOptions?: Options,
): RenderResultWithUserEvent {
  const user = userEvent.setup(userEventSetupOptions)
  return { user, ...render(ui, { wrapper: createWrapper(), ...options })};
}

export { screen, waitFor, within } from "@testing-library/react";