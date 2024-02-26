import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent.jsx";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Show from "./pages/Show.jsx";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/cinema-vibe/",
        element: <AppLayout />,

        errorElement: <PageNotFound />,
    },
    {
        path: "/cinema-vibe/:id",
        element: <Show />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <ErrorBoundary FallbackComponent={ErrorComponent}>
                <RouterProvider router={router} />
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    </QueryClientProvider>
);
