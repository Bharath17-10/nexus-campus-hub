import { motion } from "framer-motion";
import { MapPin, Calendar, Eye, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LostFoundItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  status: "lost" | "found" | "matched";
  description: string;
}

const statusConfig = {
  lost: {
    label: "Lost",
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  found: {
    label: "Found",
    color: "bg-success/10 text-success border-success/20",
  },
  matched: {
    label: "Matched",
    color: "bg-primary/10 text-primary border-primary/20",
  },
};

interface LostFoundCardProps {
  item: LostFoundItem;
}

const LostFoundCard = ({ item }: LostFoundCardProps) => {
  const status = statusConfig[item.status];

  return (
    <motion.div
      className="bg-card rounded-xl shadow-card overflow-hidden group cursor-pointer"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <Badge
          variant="outline"
          className={cn(
            "absolute top-2 left-2 border",
            status.color
          )}
        >
          {item.status === "matched" && <CheckCircle className="w-3 h-3 mr-1" />}
          {status.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <h4 className="font-semibold text-foreground text-sm line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {item.category}
          </p>
        </div>

        <div className="flex items-center gap-3 text-2xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs h-8 text-primary hover:bg-primary/5"
        >
          <Eye className="w-3 h-3 mr-1" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default LostFoundCard;
