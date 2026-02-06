import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Map } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { NearbyPlaceCard, CampusMap } from "@/components/explore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data
const nearbyPlaces = [
  {
    id: "1",
    name: "Cafe Coffee Day",
    category: "Cafe",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
    rating: 4.3,
    reviewCount: 245,
    distance: "200m",
    priceRange: "moderate" as const,
    vibe: ["Cozy", "WiFi", "Study-Friendly"],
    isOpen: true,
    isStudentFavorite: true,
  },
  {
    id: "2",
    name: "The Book Cafe",
    category: "Cafe & Bookstore",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 189,
    distance: "450m",
    priceRange: "moderate" as const,
    vibe: ["Quiet", "Books", "Aesthetic"],
    isOpen: true,
    isFavorite: true,
    isStudentFavorite: true,
  },
  {
    id: "3",
    name: "Punjabi Dhaba",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 412,
    distance: "300m",
    priceRange: "budget" as const,
    vibe: ["Authentic", "Filling", "Budget"],
    isOpen: true,
  },
  {
    id: "4",
    name: "Study Hub",
    category: "Study Space",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    distance: "100m",
    priceRange: "budget" as const,
    vibe: ["24/7", "AC", "Power Outlets"],
    isOpen: true,
    isStudentFavorite: true,
  },
  {
    id: "5",
    name: "Pizza Palace",
    category: "Fast Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop",
    rating: 4.2,
    reviewCount: 328,
    distance: "500m",
    priceRange: "moderate" as const,
    vibe: ["Quick Bites", "Late Night", "Delivery"],
    isOpen: false,
  },
  {
    id: "6",
    name: "Sports Complex",
    category: "Recreation",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 89,
    distance: "350m",
    priceRange: "budget" as const,
    vibe: ["Fitness", "Games", "Social"],
    isOpen: true,
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "cafes", label: "Cafes" },
  { id: "food", label: "Food" },
  { id: "study", label: "Study" },
  { id: "recreation", label: "Recreation" },
];

const ExplorersGuide = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("nearby");

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Explorer's Guide"
        subtitle="Discover campus and beyond"
      />

      <div className="px-4 md:px-6 pb-8">
        {/* Search */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search places..."
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 bg-muted/50 p-1">
            <TabsTrigger
              value="nearby"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <MapPin className="w-4 h-4" />
              Nearby Hub
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Map className="w-4 h-4" />
              Campus Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nearby" className="mt-0 space-y-4">
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {filters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer shrink-0 transition-colors",
                    activeFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>

            {/* Places Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {nearbyPlaces.map((place, index) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NearbyPlaceCard place={place} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            <CampusMap />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExplorersGuide;
