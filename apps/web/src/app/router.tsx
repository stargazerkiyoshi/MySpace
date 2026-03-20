import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { NodePage } from "@/pages/NodePage";
import { SpacePage } from "@/pages/SpacePage";
import { TimelinePage } from "@/pages/TimelinePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "spaces",
        element: <SpacePage />,
      },
      {
        path: "nodes",
        element: <NodePage />,
      },
      {
        path: "timeline",
        element: <TimelinePage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
