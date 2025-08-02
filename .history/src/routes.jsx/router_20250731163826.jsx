import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import InvFund from "../pages/InvFund";
import Promotion from "../pages/Promotion";
import Wallet f

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