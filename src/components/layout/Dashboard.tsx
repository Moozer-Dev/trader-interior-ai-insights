
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
