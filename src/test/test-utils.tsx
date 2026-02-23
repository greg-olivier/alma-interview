import type { PropsWithChildren, ReactNode } from "react";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
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

interface RouteConfig {
  path: string;
  element: ReactNode;
}

interface RouterOptions {
  initialEntries?: string[];
  routes?: RouteConfig[];
}

function createWrapper(routerOptions?: RouterOptions) {
  const queryClient = createTestQueryClient();
  const initialEntries = routerOptions?.initialEntries;

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          {routerOptions?.routes ? (
            <Routes>
              {routerOptions.routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          ) : (
            children
          )}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };
}

interface RenderResultWithUserEvent extends RenderResult {
  user: UserEvent;
}

interface ProviderOptions extends Omit<RenderOptions, "wrapper"> {
  routerOptions?: RouterOptions;
  userEventSetupOptions?: Options;
}

export function renderWithProviders(
  ui: ReactNode,
  options?: ProviderOptions,
): RenderResultWithUserEvent {
  const { routerOptions, userEventSetupOptions, ...renderOptions } = options ?? {};
  const user = userEvent.setup(userEventSetupOptions);
  return { user, ...render(ui, { wrapper: createWrapper(routerOptions), ...renderOptions }) };
}

export { screen, waitFor, within } from "@testing-library/react";
