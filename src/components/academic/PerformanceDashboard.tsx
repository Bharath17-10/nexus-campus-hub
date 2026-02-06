import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Calendar, Target, BookOpen, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PerformanceStats {
  cgpa: number;
  sgpa: number;
  cgpaTrend: "up" | "down" | "stable";
  attendance: number;
  completedCredits: number;
  totalCredits: number;
  examCountdown?: {
    name: string;
    days: number;
  };
}

interface PerformanceDashboardProps {
  stats: PerformanceStats;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  subValue,
  trend,
  progress,
  className,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "stable";
  progress?: number;
  className?: string;
}) => (
  <motion.div
    className={cn("bg-card rounded-xl shadow-card p-4", className)}
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      {trend && (
        <Badge
          variant="secondary"
          className={cn(
            "text-2xs",
            trend === "up" && "bg-success/10 text-success",
            trend === "down" && "bg-destructive/10 text-destructive"
          )}
        >
          {trend === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
          {trend === "down" && <TrendingDown className="w-3 h-3 mr-1" />}
          {trend === "up" ? "+0.2" : trend === "down" ? "-0.1" : "0.0"}
        </Badge>
      )}
    </div>

    <div className="mt-3">
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
    </div>

    {progress !== undefined && (
      <div className="mt-3">
        <Progress value={progress} className="h-1.5" />
      </div>
    )}
  </motion.div>
);

const PerformanceDashboard = ({ stats }: PerformanceDashboardProps) => {
  const creditProgress = (stats.completedCredits / stats.totalCredits) * 100;

  return (
    <div className="space-y-4">
      {/* Exam Countdown Banner */}
      {stats.examCountdown && (
        <motion.div
          className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-primary-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <p className="text-sm font-medium opacity-90">Upcoming</p>
                <p className="font-bold">{stats.examCountdown.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{stats.examCountdown.days}</p>
              <p className="text-xs opacity-80">days left</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={Award}
          label="CGPA"
          value={stats.cgpa.toFixed(2)}
          trend={stats.cgpaTrend}
        />
        <StatCard
          icon={Target}
          label="SGPA (Current)"
          value={stats.sgpa.toFixed(2)}
        />
        <StatCard
          icon={BookOpen}
          label="Attendance"
          value={`${stats.attendance}%`}
          progress={stats.attendance}
          subValue={stats.attendance >= 75 ? "Good standing" : "Below requirement"}
        />
        <StatCard
          icon={TrendingUp}
          label="Credits"
          value={`${stats.completedCredits}/${stats.totalCredits}`}
          progress={creditProgress}
          subValue={`${Math.round(creditProgress)}% complete`}
        />
      </div>
    </div>
  );
};

export default PerformanceDashboard;
