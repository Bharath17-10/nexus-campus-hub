import { motion } from "framer-motion";
import { Calendar, Clock, AlertTriangle, Megaphone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  title: string;
  description: string;
  type: "event" | "notice" | "urgent";
  date: string;
  countdown?: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    title: "Annual Tech Fest 2024",
    description: "Registration opens for hackathon and coding competitions",
    type: "event",
    date: "Mar 15, 2024",
    countdown: "5 days",
  },
  {
    id: "2",
    title: "Library Extended Hours",
    description: "Library open 24/7 during exam week starting next Monday",
    type: "notice",
    date: "Mar 18, 2024",
  },
  {
    id: "3",
    title: "Fee Payment Deadline",
    description: "Last date for semester fee payment without late charges",
    type: "urgent",
    date: "Mar 20, 2024",
    countdown: "10 days",
  },
];

const typeConfig = {
  event: {
    icon: Calendar,
    color: "bg-primary/10 text-primary border-primary/20",
    accent: "bg-gradient-primary",
  },
  notice: {
    icon: Megaphone,
    color: "bg-secondary text-secondary-foreground border-secondary",
    accent: "bg-secondary",
  },
  urgent: {
    icon: AlertTriangle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    accent: "bg-destructive",
  },
};

const AnnouncementCard = ({ announcement }: { announcement: Announcement }) => {
  const config = typeConfig[announcement.type];
  const Icon = config.icon;

  return (
    <motion.div
      className="bg-card rounded-xl shadow-card p-4 group cursor-pointer hover:shadow-elevated transition-shadow"
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            config.accent
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-foreground text-sm line-clamp-1">
              {announcement.title}
            </h4>
            {announcement.countdown && (
              <Badge
                variant="outline"
                className={cn("shrink-0 text-2xs", config.color)}
              >
                <Clock className="w-3 h-3 mr-1" />
                {announcement.countdown}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {announcement.description}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xs text-muted-foreground">
              {announcement.date}
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AnnouncementsFeed = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Announcements</h3>
        <Button variant="ghost" size="sm" className="text-primary text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement, index) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnnouncementCard announcement={announcement} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsFeed;
