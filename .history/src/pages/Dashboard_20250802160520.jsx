const Dashboard = () => {
  const { isOpen, toggle, close, isMobile } = useSidebarToggle();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={close} isMobile={isMobile} />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${!isMobile ? 'ml-0 md:ml-60' : ''}`}>
        {/* Header */}
        <Header onMenuClick={toggle} isMobile={isMobile} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 max-w-7xl mx-auto w-full">
          <Outlet /> {/* This will render the current route */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;