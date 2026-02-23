import type { ReactNode } from "react";
import { Component } from "react";
import { t } from "@/lib/i18n";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: log error to an external service
    console.error("[ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 text-5xl">⚠️</div>
          <h1 className="text-xl font-bold text-foreground">{t("error.generic.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("error.generic.description")}</p>
          <a
            href="/"
            className="mt-6 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("error.backToHome")}
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
