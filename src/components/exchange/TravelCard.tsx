import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users, IndianRupee, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TravelTrip {
  id: string;
  destination: string;
  from: string;
  date: string;
  time: string;
  costPerPerson: number;
  totalSeats: number;
  filledSeats: number;
  creator: {
    name: string;
    avatar: string;
  };
  coTravelers: Array<{ avatar: string; name: string }>;
}

interface TravelCardProps {
  trip: TravelTrip;
}

const TravelCard = ({ trip }: TravelCardProps) => {
  const availableSeats = trip.totalSeats - trip.filledSeats;

  return (
    <motion.div
      className="bg-card rounded-xl shadow-card overflow-hidden"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-card">
            <AvatarImage src={trip.creator.avatar} />
            <AvatarFallback>{trip.creator.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{trip.creator.name}</p>
            <p className="text-2xs text-muted-foreground">Trip Organizer</p>
          </div>
          <Badge variant="outline" className="bg-card">
            <Users className="w-3 h-3 mr-1" />
            {availableSeats} seats left
          </Badge>
        </div>
      </div>

      {/* Route */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full border-2 border-primary bg-primary/20" />
            <div className="w-0.5 h-8 bg-border" />
            <div className="w-3 h-3 rounded-full border-2 border-accent bg-accent/20" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-medium text-foreground">{trip.from}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">To</p>
              <p className="font-medium text-foreground">{trip.destination}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {trip.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {trip.time}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Co-travelers:</span>
            <div className="flex -space-x-2">
              {trip.coTravelers.slice(0, 3).map((traveler, index) => (
                <Avatar key={index} className="w-6 h-6 border-2 border-card">
                  <AvatarImage src={traveler.avatar} />
                  <AvatarFallback className="text-2xs">{traveler.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {trip.coTravelers.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border-2 border-card">
                  <span className="text-2xs text-muted-foreground">+{trip.coTravelers.length - 3}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-lg font-bold text-foreground">
            <IndianRupee className="w-4 h-4" />
            {trip.costPerPerson}
            <span className="text-xs font-normal text-muted-foreground">/person</span>
          </div>
        </div>

        <Button
          className="w-full bg-gradient-primary hover:opacity-90"
          disabled={availableSeats === 0}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {availableSeats > 0 ? "Request to Join" : "Trip Full"}
        </Button>
      </div>
    </motion.div>
  );
};

export default TravelCard;
