import { createBrowserRouter } from "react-router";
import { PlaceholderHome } from "./pages/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PlaceholderHome />,
  },
]);