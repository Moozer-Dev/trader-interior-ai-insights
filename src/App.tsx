
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/components/layout/Dashboard";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import MarketsPage from "./pages/markets/MarketsPage";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import AlertsPage from "./pages/alerts/AlertsPage";
import UsersPage from "./pages/admin/UsersPage";
import PlansPage from "./pages/admin/PlansPage";
import ReportsPage from "./pages/admin/ReportsPage";
import IntegrationsPage from "./pages/admin/IntegrationsPage";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AdminRoute from "@/components/auth/AdminRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/login" element={<Login />} />
              
              <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/markets" element={<MarketsPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
              </Route>
              
              <Route element={<AdminRoute><Dashboard /></AdminRoute>}>
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/plans" element={<PlansPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/integrations" element={<IntegrationsPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
