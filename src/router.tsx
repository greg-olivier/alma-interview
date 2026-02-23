import { createBrowserRouter } from "react-router";
import { ErrorPage } from "./pages/error";
import { PaymentsList } from "@/pages/payments-list";
import { PaymentDetail } from "./pages/payment-detail";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PaymentsList />,
      },
      {
        path: "/payments/:id",
        element: <PaymentDetail />,
      },
    ],
  },
]);
