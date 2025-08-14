import App from "../App";
import Homee from "../pages/Homee";
import InvFund from "../pages/InvFund";
import Promotion from "../pages/Promotion";
import Wallet from "../pages/Wallet";
import Kyc from "../pages/Kyc";
import DownloadApk from "../pages/DownloadApk";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ReferAndEarn from "../components/ReferAndEarn";
import Salary from "../components/Salary";
import Profile from "../pages/Profile";
import TeamTree from "../pages/TeamTree";
import Dashboard from "../pages/Dashboard";
import Login from "../Au/Login"; // Naya page
import Register from "../pages/Register"; // Naya page
import ProtectedRoute from "../components/ProtectedRoute"; // 

const router = createBrowserRouter([
  {
    path: "",
    element: <Dashboard />,
    children: [
      {
        index: true,
        // path: "home",
        element: <Homee />
      },
      {
        path: "inv-fund",
        element: <InvFund />
      },
      {
        path: "promotion",
        element: <Promotion />,
        children: [
          {
            index: true,
            element: <ReferAndEarn />,
          },
          {
            path: "salary",
            element: <Salary />,     
          }
        ]
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
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "team",
        element: <TeamTree />
      },
    ],
  },
]);

export default router;