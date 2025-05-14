
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/components/layout/Dashboard";
import Index from "./pages/Index";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            <Route element={<Dashboard />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/plans" element={<PlansPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/integrations" element={<IntegrationsPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
