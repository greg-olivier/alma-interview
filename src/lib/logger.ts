interface LogContext {
  componentStack?: string;
  [key: string]: string | undefined;
}

export const logger = {
  error: (error: unknown, context?: LogContext) => {
    // TODO: Sentry.captureException(error, { extra: context })
    console.error("[Error]", error, context);
  },
};
