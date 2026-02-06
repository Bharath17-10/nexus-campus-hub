import { motion } from "framer-motion";
import { Bell, LogOut } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { MessMenuCard, MailSummarizer, AnnouncementsFeed } from "@/components/daily-pulse";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock data
const messMenu = {
  breakfast: {
    time: "7:30 AM - 9:30 AM",
    items: [
      { name: "Masala Dosa", isVeg: true, rating: 4.5, isPopular: true },
      { name: "Poha", isVeg: true, rating: 4.2 },
      { name: "Bread Omelette", isVeg: false, rating: 4.0 },
      { name: "Fresh Fruit Bowl", isVeg: true, rating: 4.8 },
    ],
  },
  lunch: {
    time: "12:30 PM - 2:30 PM",
    items: [
      { name: "Rajma Chawal", isVeg: true, rating: 4.6, isPopular: true },
      { name: "Chicken Biryani", isVeg: false, rating: 4.7, isPopular: true },
      { name: "Dal Tadka", isVeg: true, rating: 4.3 },
      { name: "Mixed Veg Curry", isVeg: true, rating: 4.1 },
    ],
  },
  dinner: {
    time: "7:30 PM - 9:30 PM",
    items: [
      { name: "Paneer Butter Masala", isVeg: true, rating: 4.8, isPopular: true },
      { name: "Roti", isVeg: true, rating: 4.4 },
      { name: "Fish Curry", isVeg: false, rating: 4.5 },
      { name: "Jeera Rice", isVeg: true, rating: 4.2 },
    ],
  },
};

const getCurrentMealType = (): "breakfast" | "lunch" | "dinner" => {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 10) return "breakfast";
  if (hour >= 12 && hour < 15) return "lunch";
  return "dinner";
};

const DailyPulse = () => {
  const currentMeal = getCurrentMealType();
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getGreeting = () => {
    if (currentMeal === "breakfast") return "Morning";
    if (currentMeal === "lunch") return "Afternoon";
    return "Evening";
  };

  return (
    <div className="min-h-screen">
      {/* Custom Header */}
      <header className="pt-6 pb-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary/20">
              <AvatarImage src={userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.email}`} />
              <AvatarFallback>{userProfile?.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Good {getGreeting()}</p>
              <h1 className="text-xl font-bold text-foreground">{userProfile?.displayName || 'Student'}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 md:px-6 pb-8 space-y-6">
        {/* Today's Menu Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Menu</h2>
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(["breakfast", "lunch", "dinner"] as const).map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MessMenuCard
                  type={type}
                  time={messMenu[type].time}
                  items={messMenu[type].items}
                  isActive={type === currentMeal}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Two Column Layout for larger screens */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mail Summarizer */}
          <section>
            <MailSummarizer />
          </section>

          {/* Announcements */}
          <section>
            <AnnouncementsFeed />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DailyPulse;
