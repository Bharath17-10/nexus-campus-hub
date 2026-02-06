import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassItem {
  id: string;
  subject: string;
  code: string;
  time: string;
  endTime: string;
  room: string;
  professor: string;
  type: "lecture" | "lab" | "tutorial";
  isOngoing?: boolean;
  isFree?: boolean;
}

const typeConfig = {
  lecture: { color: "bg-primary/10 border-l-primary text-primary" },
  lab: { color: "bg-accent/10 border-l-accent text-accent" },
  tutorial: { color: "bg-success/10 border-l-success text-success" },
};

interface TimetableCardProps {
  classes: ClassItem[];
  day: string;
  isToday?: boolean;
}

const ClassCard = ({ item }: { item: ClassItem }) => {
  const config = typeConfig[item.type];

  if (item.isFree) {
    return (
      <motion.div
        className="p-3 rounded-lg border border-dashed border-border bg-muted/30"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{item.time} - {item.endTime}</span>
          <span className="text-sm font-medium text-success">Free Period 🎉</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(
        "p-3 rounded-lg border-l-4 relative",
        config.color,
        item.isOngoing && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {item.isOngoing && (
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}
      
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h4 className="font-semibold text-foreground text-sm">{item.subject}</h4>
          <p className="text-2xs text-muted-foreground">{item.code}</p>
        </div>
        <span className="text-2xs font-medium uppercase text-muted-foreground bg-muted px-2 py-0.5 rounded">
          {item.type}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3 text-2xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {item.time} - {item.endTime}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {item.room}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {item.professor}
        </span>
      </div>
    </motion.div>
  );
};

const TimetableCard = ({ classes, day, isToday }: TimetableCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-xl shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b border-border/50",
        isToday && "bg-primary/5"
      )}>
        <div className="flex items-center justify-between">
          <h3 className={cn(
            "font-semibold",
            isToday ? "text-primary" : "text-foreground"
          )}>
            {day}
          </h3>
          {isToday && (
            <span className="text-2xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
      </div>

      {/* Classes */}
      <div className="p-4 space-y-3">
        {classes.map((item, index) => (
          <ClassCard key={item.id || index} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default TimetableCard;
