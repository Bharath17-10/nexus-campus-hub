import { motion } from "framer-motion";
import { Utensils, Leaf, Drumstick, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MenuItemProps {
  name: string;
  isVeg: boolean;
  rating: number;
  isPopular?: boolean;
}

interface MealCardProps {
  type: "breakfast" | "lunch" | "dinner";
  time: string;
  items: MenuItemProps[];
  isActive?: boolean;
}

const mealConfig = {
  breakfast: {
    icon: "🌅",
    gradient: "from-amber-400 to-orange-500",
  },
  lunch: {
    icon: "☀️",
    gradient: "from-yellow-400 to-amber-500",
  },
  dinner: {
    icon: "🌙",
    gradient: "from-indigo-400 to-purple-500",
  },
};

const MenuItem = ({ name, isVeg, rating, isPopular }: MenuItemProps) => (
  <motion.div
    className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-5 h-5 rounded-sm flex items-center justify-center border-2",
          isVeg ? "border-success bg-success/10" : "border-destructive bg-destructive/10"
        )}
      >
        {isVeg ? (
          <Leaf className="w-3 h-3 text-success" />
        ) : (
          <Drumstick className="w-3 h-3 text-destructive" />
        )}
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
      {isPopular && (
        <Badge variant="secondary" className="text-2xs px-1.5 py-0.5 bg-accent/10 text-accent border-0">
          <TrendingUp className="w-3 h-3 mr-1" />
          Popular
        </Badge>
      )}
    </div>
    <div className="flex items-center gap-1 text-muted-foreground">
      <Star className="w-3.5 h-3.5 fill-warning text-warning" />
      <span className="text-xs font-medium">{rating}</span>
    </div>
  </motion.div>
);

const MessMenuCard = ({ type, time, items, isActive }: MealCardProps) => {
  const config = mealConfig[type];

  return (
    <motion.div
      className={cn(
        "bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-300",
        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className={cn("bg-gradient-to-r p-4", config.gradient)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <div>
              <h3 className="font-semibold text-white capitalize">{type}</h3>
              <p className="text-white/80 text-xs">{time}</p>
            </div>
          </div>
          {isActive && (
            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
              Now Serving
            </Badge>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </motion.div>
  );
};

export default MessMenuCard;
