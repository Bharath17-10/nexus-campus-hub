import { motion } from "framer-motion";
import { Star, MapPin, Clock, Heart, ExternalLink, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NearbyPlace {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: "budget" | "moderate" | "premium";
  vibe: string[];
  isOpen: boolean;
  isFavorite?: boolean;
  isStudentFavorite?: boolean;
}

const priceConfig = {
  budget: { label: "₹", color: "text-success" },
  moderate: { label: "₹₹", color: "text-warning" },
  premium: { label: "₹₹₹", color: "text-destructive" },
};

interface NearbyPlaceCardProps {
  place: NearbyPlace;
  onFavorite?: () => void;
}

const NearbyPlaceCard = ({ place, onFavorite }: NearbyPlaceCardProps) => {
  const price = priceConfig[place.priceRange];

  return (
    <motion.div
      className="bg-card rounded-xl shadow-card overflow-hidden group"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] bg-muted">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            {place.isStudentFavorite && (
              <Badge className="bg-accent text-accent-foreground border-0 text-2xs">
                🎓 Student Favorite
              </Badge>
            )}
            <Badge
              variant="outline"
              className={cn(
                "bg-card/80 backdrop-blur-sm border-0",
                place.isOpen ? "text-success" : "text-muted-foreground"
              )}
            >
              <Clock className="w-3 h-3 mr-1" />
              {place.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>
          <button
            onClick={onFavorite}
            className={cn(
              "w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-colors",
              place.isFavorite ? "text-destructive" : "text-foreground hover:text-destructive"
            )}
          >
            <Heart className={cn("w-4 h-4", place.isFavorite && "fill-current")} />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-2 left-2 right-2">
          <h4 className="font-semibold text-white text-lg">{place.name}</h4>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              {place.rating}
            </span>
            <span>({place.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {place.distance}
          </div>
          <span className={cn("font-medium", price.color)}>
            {price.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {place.vibe.map((v) => (
            <Badge key={v} variant="secondary" className="text-2xs">
              {v}
            </Badge>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs h-8"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default NearbyPlaceCard;
