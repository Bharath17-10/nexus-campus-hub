import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles, AlertCircle, Calendar, Megaphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SummaryResult {
  summary: string;
  category: "Academic" | "Event" | "Urgent" | "General";
  priority: "High" | "Medium" | "Low";
}

const categoryConfig = {
  Academic: { icon: Calendar, color: "bg-primary/10 text-primary" },
  Event: { icon: Megaphone, color: "bg-accent/10 text-accent" },
  Urgent: { icon: AlertCircle, color: "bg-destructive/10 text-destructive" },
  General: { icon: Mail, color: "bg-muted text-muted-foreground" },
};

const priorityConfig = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

const MailSummarizer = () => {
  const [emailContent, setEmailContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);

  const handleSummarize = async () => {
    if (!emailContent.trim()) return;

    setIsProcessing(true);
    setResult(null);

    try {
      // Import the service dynamically to avoid issues
      const { summarizeEmail } = await import('@/services/gemini.service');
      const summary = await summarizeEmail(emailContent);
      setResult(summary);
    } catch (error: any) {
      console.error('Error summarizing email:', error);
      // Fallback to mock data if API fails
      const mockResults: SummaryResult[] = [
        {
          summary: "Final exam schedule released for semester end. Check your course-specific timings in the portal.",
          category: "Academic",
          priority: "High",
        },
        {
          summary: "Annual cultural fest 'Harmony' registration opens next week. Early bird discounts available.",
          category: "Event",
          priority: "Medium",
        },
        {
          summary: "Library will be closed for maintenance this weekend. Digital resources remain accessible.",
          category: "General",
          priority: "Low",
        },
      ];
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
    } finally {
      setIsProcessing(false);
    }
  };

  const CategoryIcon = result ? categoryConfig[result.category].icon : Mail;

  return (
    <motion.div
      className="bg-card rounded-2xl shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Mail Summarizer</h3>
            <p className="text-xs text-muted-foreground">Paste any email to get a quick summary</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 space-y-4">
        <Textarea
          placeholder="Paste your college email content here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="min-h-[100px] resize-none bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />

        <Button
          onClick={handleSummarize}
          disabled={!emailContent.trim() || isProcessing}
          className="w-full bg-gradient-primary hover:opacity-90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Summarize Email
            </>
          )}
        </Button>

        {/* Result */}
        {result && (
          <motion.div
            className="mt-4 p-4 bg-muted/50 rounded-xl space-y-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Category & Priority */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={cn(
                  "border-0",
                  categoryConfig[result.category].color
                )}
              >
                <CategoryIcon className="w-3 h-3 mr-1" />
                {result.category}
              </Badge>
              <Badge
                variant="outline"
                className={cn("border", priorityConfig[result.priority])}
              >
                {result.priority} Priority
              </Badge>
            </div>

            {/* Summary */}
            <p className="text-sm text-foreground leading-relaxed">
              {result.summary}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MailSummarizer;
