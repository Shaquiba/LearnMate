import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, ExternalLink, Play, CheckCircle, Circle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  resources: {
    type: "video" | "article" | "tutorial" | "practice";
    title: string;
    url: string;
    duration?: string;
  }[];
  completed: boolean;
}

const RoadmapPage = () => {
  const [searchParams] = useSearchParams();
  const goal = searchParams.get("goal") || "React Developer";
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { generateRoadmap } = await import("@/lib/gemini");
        const roadmapData = await generateRoadmap(goal);
        setRoadmap(roadmapData);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
        setRoadmap(generateMockRoadmap());
      } finally {
        setIsLoading(false);
      }
    };

    const generateMockRoadmap = (): RoadmapStep[] => {
      return [
        {
          id: "1",
          title: "JavaScript Fundamentals",
          description: "Master core JavaScript concepts including variables, functions, arrays, and objects",
          duration: "2-3 weeks",
          difficulty: "Beginner",
          resources: [
            {
              type: "video",
              title: "JavaScript Crash Course",
              url: "https://youtube.com/watch?v=hdI2bqOjy3c",
              duration: "1.5 hours"
            },
            {
              type: "tutorial",
              title: "Interactive JavaScript Tutorial",
              url: "https://javascript.info/",
            },
            {
              type: "practice",
              title: "JavaScript Exercises",
              url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
            }
          ],
          completed: false
        },
        {
          id: "2", 
          title: "React Basics",
          description: "Learn React components, JSX, props, and state management",
          duration: "3-4 weeks",
          difficulty: "Beginner",
          resources: [
            {
              type: "video",
              title: "React Tutorial for Beginners",
              url: "https://youtube.com/watch?v=SqcY0GlETPk",
              duration: "2 hours"
            },
            {
              type: "tutorial",
              title: "Official React Tutorial",
              url: "https://react.dev/learn",
            },
            {
              type: "practice", 
              title: "Build a Todo App",
              url: "https://react.dev/learn/tutorial-tic-tac-toe",
            }
          ],
          completed: false
        },
        {
          id: "3",
          title: "React Hooks & Advanced Patterns",
          description: "Master useState, useEffect, custom hooks, and React patterns",
          duration: "2-3 weeks", 
          difficulty: "Intermediate",
          resources: [
            {
              type: "video",
              title: "React Hooks Deep Dive",
              url: "https://youtube.com/watch?v=TNhaISOUy6Q",
              duration: "3 hours"
            },
            {
              type: "article",
              title: "Complete Guide to React Hooks",
              url: "https://react.dev/reference/react",
            }
          ],
          completed: false
        }
      ];
    };

    fetchRoadmap();
  }, [goal]);

  const toggleStepCompletion = (stepId: string) => {
    setRoadmap(prev => prev.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedSteps = roadmap.filter(step => step.completed).length;
  const progressPercentage = roadmap.length > 0 ? (completedSteps / roadmap.length) * 100 : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400";
      case "Advanced": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-primary-glow animate-spin flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-background"></div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Generating Your Roadmap</h2>
              <p className="text-muted-foreground">AI is creating a personalized learning path for: <span className="text-primary font-medium">{goal}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="glass-card p-8 rounded-2xl mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Learning Roadmap: <span className="gradient-text">{goal}</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              Follow this AI-generated roadmap to achieve your learning goals step by step.
            </p>
            
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{completedSteps}/{roadmap.length} steps completed</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="gradient-button">
                <BookOpen className="h-4 w-4 mr-2" />
                Save Roadmap
              </Button>
              <Button variant="outline" asChild>
                <Link to="/quiz">Take Quiz</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/career-connect">View Career Paths</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {roadmap.map((step, index) => (
            <Card key={step.id} className="glass-card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleStepCompletion(step.id)}
                      className="mt-1 transition-colors"
                    >
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground hover:text-primary" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                        <Badge className={getDifficultyColor(step.difficulty)}>
                          {step.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className={`text-xl ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {step.duration}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Learning Resources:</h4>
                  {step.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div className="flex items-center space-x-3">
                        {resource.type === "video" && <Play className="h-4 w-4 text-red-500" />}
                        {resource.type === "article" && <BookOpen className="h-4 w-4 text-blue-500" />}
                        {resource.type === "tutorial" && <BookOpen className="h-4 w-4 text-green-500" />}
                        {resource.type === "practice" && <BookOpen className="h-4 w-4 text-purple-500" />}
                        <div>
                          <p className="font-medium text-sm">{resource.title}</p>
                          {resource.duration && (
                            <p className="text-xs text-muted-foreground">{resource.duration}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Open
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;