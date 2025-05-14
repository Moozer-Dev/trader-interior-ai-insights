
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex-1 p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
