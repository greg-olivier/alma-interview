import { createBrowserRouter } from "react-router";
import { PaymentsList } from "@/pages/payments-list";
import { ErrorPage } from "./pages/error";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PaymentsList />,
      },
    ],
  },
]);
