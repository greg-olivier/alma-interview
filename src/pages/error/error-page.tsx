import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { t } from "@/lib/i18n";

export function ErrorPage() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 text-5xl">{isNotFound ? "🔍" : "⚠️"}</div>
      <h1 className="text-xl font-bold text-foreground">
        {isNotFound ? t("error.notFound.title") : t("error.generic.title")}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {isNotFound ? t("error.notFound.description") : t("error.generic.description")}
      </p>
      <Link
        to="/"
        className="mt-6 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t("error.backToHome")}
      </Link>
    </div>
  );
}
