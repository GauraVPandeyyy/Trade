import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import InvFund from "../pages/InvFund";
import Promotion from "../pages/Promotion";
import Wallet from "../pages/Wallet"
import Kyc from "../pages/Kyc"
import DownloadApk from "../pages/DownloadApk"

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
            path: "/wallet",
            element:<Wallet/>
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