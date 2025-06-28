import { createBrowserRouter } from "react-router-dom";
import { Index } from "./pages/app/Home";
import { Plans } from "./pages/app/Plans/plans";
import { AppLayout } from "./pages/_layouts/app";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/planos", element: <Plans /> }
    ]
  }

])