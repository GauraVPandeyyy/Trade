import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import In from "../pages/Home";
import Home from "../pages/Home";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element:<Home/>
        },
        {
            path: "/inv-fund",
            element:<InvFund />
        },
        {
            path: "/promotion",
            element:<Promotion/>
        },
        {
            path: "/",
            element:<Home/>
        },
    ]
)

export default router;