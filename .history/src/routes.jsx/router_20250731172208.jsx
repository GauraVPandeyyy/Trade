import App from "../App";
import Home from "../pages/Home";
import InvFund from "../pages/InvFund";
import Promotion from "../pages/Home";
import Home from "../pages/Home";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // <- this is where your common UI goes (App.jsx)
        children: [
            { path: "", element: <Home /> }, // same as "/"
            { path: "inv-fund", element: <InvFund /> },
            { path: "promotion", element: <Promotion /> },
            { path: "wallet", element: <Wallet /> },
            { path: "kyc", element: <Kyc /> },
            { path: "download", element: <DownloadApk /> },
        ],
    },
]);
