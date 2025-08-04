import App from "../App";
import Homee from "../pages/Homee";
import InvFund from "../pages/InvFund";
import Promotion from "../pages/Promotion";
import Wallet from "../pages/Wallet";
import Kyc from "../pages/Kyc";
import DownloadApk from "../pages/DownloadApk";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { 
        index: true,
        element: <Homee /> 
      },
      { 
        path: "inv-fund", 
        element: <InvFund /> 
      },
      { 
        path: "promotion", 
        element: <Promotion /> 
      },
      { 
        path: "wallet", 
        element: <Wallet /> 
      },
      { 
        path: "kyc", 
        element: <Kyc /> 
      },
      { 
        path: "download", 
        element: <DownloadApk /> 
      },
    ],
  },
]);

export default router;