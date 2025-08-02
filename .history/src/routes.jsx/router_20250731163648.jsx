import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
const router = createBrowserRouter(
    [
        {
            path: "/",
            element:<Home/>
        },
        {
            path: "/inv-fund",
            element:<InvF/>
        },
        {
            path: "/",
            element:<Home/>
        },
        {
            path: "/",
            element:<Home/>
        },
    ]
)

export default router;