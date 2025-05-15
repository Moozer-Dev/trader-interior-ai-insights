
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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

// New page imports for the links in footer
// Using the new pages we've created
const Careers = () => <div className="p-8 text-center">Página de Carreiras em construção</div>;
const Terms = () => <div className="p-8 text-center">Termos de Uso em construção</div>;
const Privacy = () => <div className="p-8 text-center">Política de Privacidade em construção</div>;
const Cookies = () => <div className="p-8 text-center">Política de Cookies em construção</div>;

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
              
              {/* Public pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/blog/category/:category" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
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
