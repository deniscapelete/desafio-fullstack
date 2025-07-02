import { createBrowserRouter } from "react-router-dom";
import { Index } from "./pages/app/Home";
import { Plans } from "./pages/app/Plans/plans";
import { AppLayout } from "./pages/_layouts/app";
import { Payments } from "./pages/app/Payments/payments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/planos", element: <Plans /> },
      { path: '/pagamentos', element: <Payments /> }
    ]
  }

])