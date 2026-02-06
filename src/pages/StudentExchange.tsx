import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, Package, ShoppingBag, Car } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { LostFoundCard, MarketplaceCard, TravelCard } from "@/components/exchange";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock data
const lostFoundItems = [
  {
    id: "1",
    title: "AirPods Pro Case",
    category: "Electronics",
    location: "Library 2nd Floor",
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    status: "lost" as const,
    description: "White AirPods Pro case with scratches on the lid",
  },
  {
    id: "2",
    title: "Blue Umbrella",
    category: "Accessories",
    location: "Cafeteria",
    date: "Mar 9, 2024",
    image: "https://images.unsplash.com/photo-1534309466160-70b22cc6252c?w=400&h=400&fit=crop",
    status: "found" as const,
    description: "Navy blue compact umbrella",
  },
  {
    id: "3",
    title: "Student ID Card",
    category: "Documents",
    location: "Main Building",
    date: "Mar 8, 2024",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    status: "matched" as const,
    description: "ID card belonging to CS department",
  },
  {
    id: "4",
    title: "Water Bottle",
    category: "Personal Items",
    location: "Gym",
    date: "Mar 7, 2024",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    status: "found" as const,
    description: "Steel water bottle with stickers",
  },
];

const marketplaceItems = [
  {
    id: "1",
    title: "Engineering Mathematics Textbook",
    price: 450,
    originalPrice: 800,
    condition: "good" as const,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    seller: { name: "Rahul K.", rating: 4.8 },
    isWishlisted: false,
  },
  {
    id: "2",
    title: "Bicycle - Firefox Hybrid",
    price: 8500,
    originalPrice: 15000,
    condition: "like-new" as const,
    category: "Vehicles",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop",
    seller: { name: "Priya S.", rating: 4.9 },
    isWishlisted: true,
  },
  {
    id: "3",
    title: "Study Lamp - LED",
    price: 350,
    condition: "new" as const,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    seller: { name: "Amit R.", rating: 4.5 },
    isWishlisted: false,
  },
  {
    id: "4",
    title: "Casio Scientific Calculator",
    price: 800,
    originalPrice: 1200,
    condition: "like-new" as const,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1564473185935-5da6e1d6a4ed?w=400&h=300&fit=crop",
    seller: { name: "Neha P.", rating: 4.7 },
    isWishlisted: false,
  },
];

const travelTrips = [
  {
    id: "1",
    destination: "Delhi Airport (IGI T3)",
    from: "Campus Main Gate",
    date: "Mar 15, 2024",
    time: "6:00 AM",
    costPerPerson: 250,
    totalSeats: 4,
    filledSeats: 2,
    creator: {
      name: "Arjun Mehta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arjun",
    },
    coTravelers: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1", name: "Ravi" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2", name: "Meera" },
    ],
  },
  {
    id: "2",
    destination: "Connaught Place",
    from: "Campus Gate 2",
    date: "Mar 12, 2024",
    time: "4:00 PM",
    costPerPerson: 80,
    totalSeats: 3,
    filledSeats: 1,
    creator: {
      name: "Simran Kaur",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=simran",
    },
    coTravelers: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3", name: "Karan" },
    ],
  },
  {
    id: "3",
    destination: "Noida Sector 18",
    from: "Campus Main Gate",
    date: "Mar 11, 2024",
    time: "7:00 PM",
    costPerPerson: 60,
    totalSeats: 4,
    filledSeats: 3,
    creator: {
      name: "Vikram Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    },
    coTravelers: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4", name: "Ankit" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user5", name: "Pooja" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user6", name: "Raj" },
    ],
  },
];

const StudentExchange = () => {
  const [activeTab, setActiveTab] = useState("lost-found");

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Student Exchange"
        subtitle="Buy, sell, share, and connect"
        action={
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Post
          </Button>
        }
      />

      <div className="px-4 md:px-6 pb-8">
        {/* Search */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items, rides..."
              className="pl-10 bg-card border-border/50"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger
              value="lost-found"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Lost & Found</span>
              <span className="sm:hidden">L&F</span>
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Marketplace</span>
              <span className="sm:hidden">Shop</span>
            </TabsTrigger>
            <TabsTrigger
              value="travel"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Car className="w-4 h-4" />
              <span className="hidden sm:inline">Travel</span>
              <span className="sm:hidden">Ride</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="lost-found" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {lostFoundItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <LostFoundCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="marketplace" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {marketplaceItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <MarketplaceCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="travel" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {travelTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TravelCard trip={trip} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentExchange;
