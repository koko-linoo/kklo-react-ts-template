import DashboardLayout from "@/components/layout/DashboardLayout";
import { Login } from "@/pages/auth/Login";
import { DashboardPage } from "@/pages/dashboard/Dashboard";
import { ErrorPage } from "@/components/pages/ErrorPage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";
import WelcomePage from "@/pages/WelcomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
