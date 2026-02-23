import { QueryClient, QueryCache } from "@tanstack/react-query";
import { logger } from "@/lib/logger";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      logger.error(error, { source: "query", queryKey: JSON.stringify(query.queryKey) });
    },
  }),
});
