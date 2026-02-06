import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Loader2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateStudySchedule } from '@/services/gemini.service';
import { useAuth } from '@/contexts/AuthContext';

const StudyPlanner = () => {
    const { userProfile } = useAuth();
    const [subjects, setSubjects] = useState('');
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState<{ schedule: string; tips: string[] } | null>(null);

    const handleGenerate = async () => {
        if (!subjects.trim()) return;

        setLoading(true);
        try {
            const subjectList = subjects.split(',').map((s) => s.trim()).filter(Boolean);
            const result = await generateStudySchedule(subjectList);
            setSchedule(result);
        } catch (error) {
            console.error('Error generating schedule:', error);
            // Fallback
            setSchedule({
                schedule: 'Study each subject for 2 hours daily with 15-minute breaks between sessions.',
                tips: [
                    'Start with the most challenging subject when you\'re fresh',
                    'Use the Pomodoro technique: 25 min study, 5 min break',
                    'Review notes within 24 hours of class',
                    'Practice active recall instead of passive reading',
                    'Get 7-8 hours of sleep for better retention',
                ],
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">AI Study Planner</h3>
                    <p className="text-xs text-muted-foreground">Generate personalized study schedules</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subjects">Your Subjects (comma-separated)</Label>
                    <Input
                        id="subjects"
                        placeholder="e.g., Mathematics, Physics, Chemistry"
                        value={subjects}
                        onChange={(e) => setSubjects(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleGenerate}
                    disabled={!subjects.trim() || loading}
                    className="w-full bg-gradient-primary hover:opacity-90"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Schedule
                        </>
                    )}
                </Button>

                {schedule && (
                    <motion.div
                        className="mt-4 space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Schedule */}
                        <div className="p-4 bg-muted/50 rounded-xl">
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Your Study Schedule
                            </h4>
                            <p className="text-sm text-foreground leading-relaxed">{schedule.schedule}</p>
                        </div>

                        {/* Tips */}
                        <div>
                            <h4 className="font-semibold text-sm mb-2">Study Tips</h4>
                            <div className="space-y-2">
                                {schedule.tips.map((tip, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <Badge variant="outline" className="mt-0.5 shrink-0">
                                            {idx + 1}
                                        </Badge>
                                        <p className="text-sm text-muted-foreground">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </Card>
    );
};

export default StudyPlanner;
