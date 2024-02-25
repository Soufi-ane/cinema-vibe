import React from "react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <ErrorBoundary FallbackComponent={ErrorComponent}>
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    </QueryClientProvider>
);
