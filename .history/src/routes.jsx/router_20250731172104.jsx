const router = createBrowserRouter([
    {
        path: "/",
        element: < />, // <- this is where your common UI goes (App.jsx)
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
