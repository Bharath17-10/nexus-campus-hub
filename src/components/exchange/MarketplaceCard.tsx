import { motion } from "framer-motion";
import { Heart, MessageCircle, Star, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  condition: "new" | "like-new" | "good" | "fair";
  category: string;
  image: string;
  seller: {
    name: string;
    rating: number;
  };
  isWishlisted?: boolean;
}

const conditionConfig = {
  new: { label: "New", color: "bg-success/10 text-success" },
  "like-new": { label: "Like New", color: "bg-primary/10 text-primary" },
  good: { label: "Good", color: "bg-warning/10 text-warning" },
  fair: { label: "Fair", color: "bg-muted text-muted-foreground" },
};

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onWishlist?: () => void;
}

const MarketplaceCard = ({ item, onWishlist }: MarketplaceCardProps) => {
  const condition = conditionConfig[item.condition];

  return (
    <motion.div
      className="bg-card rounded-xl shadow-card overflow-hidden group"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onWishlist}
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors",
            item.isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-destructive"
          )}
        >
          <Heart className={cn("w-4 h-4", item.isWishlisted && "fill-current")} />
        </button>
        <Badge className={cn("absolute top-2 left-2 border-0", condition.color)}>
          {condition.label}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <h4 className="font-semibold text-foreground text-sm line-clamp-1">
            {item.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-foreground">
              ₹{item.price.toLocaleString()}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{item.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-2xs text-muted-foreground">
            <span>{item.seller.name}</span>
            <Star className="w-3 h-3 fill-warning text-warning" />
            <span>{item.seller.rating}</span>
          </div>
          <Badge variant="outline" className="text-2xs">
            <Tag className="w-3 h-3 mr-1" />
            {item.category}
          </Badge>
        </div>

        <Button
          size="sm"
          className="w-full text-xs h-8 bg-gradient-primary hover:opacity-90"
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          Contact Seller
        </Button>
      </div>
    </motion.div>
  );
};

export default MarketplaceCard;
