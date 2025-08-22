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
import TeamTree from "../p";
import Login from "../Auth/Login"; 
import Register from "../Auth/Register"; 
import ProtectedRoute from "./ProtectedRoute";
import Withdrawal from "../components/Withdrawal";

const router = createBrowserRouter([

  // Public Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },


  // Protected Routes
  {
    path: "/",
    element: <ProtectedRoute />, // Dashboard aur uske bachhe ab protected hain
    children: [

      {
        path: "/",
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
          {
            path: "withdrawal",
            element: <Withdrawal />
          },
        ],
      },
    ],
  }
]);

export default router;