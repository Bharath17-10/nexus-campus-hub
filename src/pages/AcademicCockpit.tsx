import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { TimetableCard, AssignmentsList, PerformanceDashboard } from "@/components/academic";
import StudyPlanner from "@/components/academic/StudyPlanner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const todayClasses = [
  {
    id: "1",
    subject: "Data Structures & Algorithms",
    code: "CS201",
    time: "9:00 AM",
    endTime: "10:30 AM",
    room: "LH-301",
    professor: "Dr. Sharma",
    type: "lecture" as const,
    isOngoing: true,
  },
  {
    id: "2",
    subject: "Free Period",
    code: "",
    time: "10:30 AM",
    endTime: "11:30 AM",
    room: "",
    professor: "",
    type: "lecture" as const,
    isFree: true,
  },
  {
    id: "3",
    subject: "Database Management",
    code: "CS301",
    time: "11:30 AM",
    endTime: "1:00 PM",
    room: "LH-204",
    professor: "Prof. Gupta",
    type: "lecture" as const,
  },
  {
    id: "4",
    subject: "Operating Systems Lab",
    code: "CS302L",
    time: "2:00 PM",
    endTime: "5:00 PM",
    room: "Lab-102",
    professor: "Dr. Patel",
    type: "lab" as const,
  },
];

const tomorrowClasses = [
  {
    id: "1",
    subject: "Computer Networks",
    code: "CS401",
    time: "9:00 AM",
    endTime: "10:30 AM",
    room: "LH-301",
    professor: "Dr. Kumar",
    type: "lecture" as const,
  },
  {
    id: "2",
    subject: "Web Development Tutorial",
    code: "CS205T",
    time: "11:00 AM",
    endTime: "12:00 PM",
    room: "TR-05",
    professor: "Ms. Singh",
    type: "tutorial" as const,
  },
  {
    id: "3",
    subject: "Artificial Intelligence",
    code: "CS501",
    time: "2:00 PM",
    endTime: "3:30 PM",
    room: "LH-102",
    professor: "Dr. Verma",
    type: "lecture" as const,
  },
];

const assignments = [
  {
    id: "1",
    title: "DSA Assignment 3 - Trees & Graphs",
    course: "CS201 - Data Structures",
    dueDate: "Mar 15, 2024",
    daysLeft: 5,
    status: "pending" as const,
  },
  {
    id: "2",
    title: "ER Diagram - Library System",
    course: "CS301 - Database Management",
    dueDate: "Mar 12, 2024",
    daysLeft: 2,
    status: "pending" as const,
  },
  {
    id: "3",
    title: "Process Scheduling Report",
    course: "CS302 - Operating Systems",
    dueDate: "Mar 10, 2024",
    daysLeft: 0,
    status: "submitted" as const,
  },
  {
    id: "4",
    title: "SQL Queries Practice",
    course: "CS301 - Database Management",
    dueDate: "Mar 5, 2024",
    daysLeft: -5,
    status: "graded" as const,
    grade: "18",
    maxGrade: "20",
  },
  {
    id: "5",
    title: "Linked List Implementation",
    course: "CS201 - Data Structures",
    dueDate: "Mar 1, 2024",
    daysLeft: -9,
    status: "graded" as const,
    grade: "45",
    maxGrade: "50",
  },
];

const performanceStats = {
  cgpa: 8.75,
  sgpa: 8.90,
  cgpaTrend: "up" as const,
  attendance: 82,
  completedCredits: 96,
  totalCredits: 160,
  examCountdown: {
    name: "Mid-Semester Exams",
    days: 21,
  },
};

const AcademicCockpit = () => {
  const [activeTab, setActiveTab] = useState("timetable");
  const [weekOffset, setWeekOffset] = useState(0);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Academic Cockpit"
        subtitle="Your academic command center"
      />

      <div className="px-4 md:px-6 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 bg-muted/50 p-1">
            <TabsTrigger
              value="timetable"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Timetable</span>
              <span className="sm:hidden">Time</span>
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Assignments</span>
              <span className="sm:hidden">Tasks</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex items-center gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timetable" className="mt-0 space-y-4">
            {/* Week Navigation */}
            <div className="flex items-center justify-between bg-card rounded-xl shadow-card p-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekOffset((prev) => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="font-medium text-foreground">
                {weekOffset === 0 ? "This Week" : weekOffset === 1 ? "Next Week" : `Week ${weekOffset > 0 ? "+" : ""}${weekOffset}`}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setWeekOffset((prev) => prev + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Timetable Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <TimetableCard
                  day="Monday"
                  classes={todayClasses}
                  isToday={weekOffset === 0}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <TimetableCard
                  day="Tuesday"
                  classes={tomorrowClasses}
                />
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-0">
            <AssignmentsList assignments={assignments} />
          </TabsContent>

          <TabsContent value="performance" className="mt-0">
            <div className="space-y-6">
              <PerformanceDashboard stats={performanceStats} />

              {/* AI Study Planner */}
              <div className="mt-6">
                <StudyPlanner />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AcademicCockpit;
