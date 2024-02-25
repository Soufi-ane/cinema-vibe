import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Show from "./pages/Show";
import PageNotFound from "./pages/PageNotFound";

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

function App() {
    return (
        <RouterProvider router={router}>
            <AppLayout />
        </RouterProvider>
    );
}

export default App;
