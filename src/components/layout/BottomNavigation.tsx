import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Users, MapPin, GraduationCap, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "/",
    label: "Daily Pulse",
    icon: Home,
  },
  {
    path: "/exchange",
    label: "Exchange",
    icon: Users,
  },
  {
    path: "/explore",
    label: "Explorer",
    icon: MapPin,
  },
  {
    path: "/academic",
    label: "Academic",
    icon: GraduationCap,
  },
  {
    path: "/lost-found",
    label: "Lost & Found",
    icon: Package,
  },
];

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass border-t border-border/50 pb-safe">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center justify-center flex-1 h-full"
                >
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={cn(
                        "relative p-2 rounded-xl transition-colors duration-200",
                        isActive ? "bg-primary/10" : "bg-transparent"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon
                        className={cn(
                          "w-5 h-5 relative z-10 transition-colors duration-200",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-2xs font-medium transition-colors duration-200",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-20 flex-col items-center py-6 glass border-r border-border/50">
        <div className="flex flex-col items-center gap-2">
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <motion.div
                  className={cn(
                    "relative p-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>

                {/* Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;
