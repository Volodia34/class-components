import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import DetailedCard from "./components/DetailedCard/DetailedCard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "details/:cardId",
        element: <DetailedCard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;
