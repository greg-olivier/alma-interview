import { createBrowserRouter } from "react-router";
import { PaymentsList } from "@/pages/payments-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PaymentsList />,
  },
]);
