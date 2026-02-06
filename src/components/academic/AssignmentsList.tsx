import { motion } from "framer-motion";
import { FileText, Calendar, CheckCircle, Clock, AlertCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  daysLeft: number;
  status: "pending" | "submitted" | "graded" | "late";
  grade?: string;
  maxGrade?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "bg-warning/10 text-warning border-warning/20",
    label: "Pending",
  },
  submitted: {
    icon: CheckCircle,
    color: "bg-success/10 text-success border-success/20",
    label: "Submitted",
  },
  graded: {
    icon: CheckCircle,
    color: "bg-primary/10 text-primary border-primary/20",
    label: "Graded",
  },
  late: {
    icon: AlertCircle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    label: "Late",
  },
};

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard = ({ assignment }: AssignmentCardProps) => {
  const config = statusConfig[assignment.status];
  const StatusIcon = config.icon;
  const isUrgent = assignment.status === "pending" && assignment.daysLeft <= 2;

  return (
    <motion.div
      className={cn(
        "bg-card rounded-xl shadow-card p-4 border-l-4",
        isUrgent ? "border-l-destructive" : "border-l-primary"
      )}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            isUrgent ? "bg-destructive/10" : "bg-primary/10"
          )}>
            <FileText className={cn(
              "w-5 h-5",
              isUrgent ? "text-destructive" : "text-primary"
            )} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{assignment.title}</h4>
            <p className="text-2xs text-muted-foreground">{assignment.course}</p>
          </div>
        </div>
        <Badge variant="outline" className={cn("shrink-0 border", config.color)}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {config.label}
        </Badge>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>Due: {assignment.dueDate}</span>
          {assignment.status === "pending" && (
            <Badge
              variant="secondary"
              className={cn(
                "text-2xs",
                isUrgent ? "bg-destructive/10 text-destructive" : ""
              )}
            >
              {assignment.daysLeft} days left
            </Badge>
          )}
        </div>

        {assignment.status === "graded" && assignment.grade && (
          <span className="text-sm font-bold text-primary">
            {assignment.grade}/{assignment.maxGrade}
          </span>
        )}

        {assignment.status === "pending" && (
          <Button size="sm" variant="outline" className="text-xs h-7">
            <Upload className="w-3 h-3 mr-1" />
            Submit
          </Button>
        )}
      </div>
    </motion.div>
  );
};

interface AssignmentsListProps {
  assignments: Assignment[];
}

const AssignmentsList = ({ assignments }: AssignmentsListProps) => {
  const pendingCount = assignments.filter(a => a.status === "pending").length;
  const completedCount = assignments.filter(a => a.status === "submitted" || a.status === "graded").length;
  const progress = (completedCount / assignments.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <div className="bg-card rounded-xl shadow-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Assignment Progress</span>
          <span className="text-sm text-muted-foreground">{completedCount}/{assignments.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {pendingCount} pending submission{pendingCount !== 1 && 's'}
        </p>
      </div>

      {/* Assignment List */}
      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AssignmentCard assignment={assignment} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsList;
