import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout";
import DailyPulse from "./pages/DailyPulse";
import StudentExchange from "./pages/StudentExchange";
import ExplorersGuide from "./pages/ExplorersGuide";
import AcademicCockpit from "./pages/AcademicCockpit";
import LostAndFound from "./pages/LostAndFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <DailyPulse />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/exchange"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <StudentExchange />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ExplorersGuide />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/academic"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AcademicCockpit />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/lost-found"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <LostAndFound />
                  </AppLayout>
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
