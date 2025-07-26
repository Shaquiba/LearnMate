import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Brain, Trophy, Target, TrendingUp, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useUserData } from "@/hooks/useUserData";
import { formatDistanceToNow } from "date-fns";

const DashboardPage = () => {
  const { profile, roadmaps, stats, loading } = useUserData();

  const getDisplayName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    return "Learner";
  };

  const formatLastAccessed = (dateString: string | null) => {
    if (!dateString) return "Never";
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          {/* Loading Header */}
          <div className="mb-8">
            <Skeleton className="h-10 w-96 mb-2" />
            <Skeleton className="h-6 w-80" />
          </div>

          {/* Loading Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="p-4 text-center">
                  <Skeleton className="w-8 h-8 mx-auto mb-2 rounded-lg" />
                  <Skeleton className="h-8 w-12 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Loading Roadmaps */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <Skeleton className="h-6 w-40 mb-2" />
                          <div className="flex items-center space-x-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Loading Quick Actions */}
            <div>
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Skeleton className="w-8 h-8 rounded-lg" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
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
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{getDisplayName()}</span>!
          </h1>
          <p className="text-muted-foreground">Continue your learning journey and achieve your goals.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <Card className="glass-card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.totalRoadmaps}</div>
              <div className="text-xs text-muted-foreground">Active Roadmaps</div>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.completedSteps}</div>
              <div className="text-xs text-muted-foreground">Steps Completed</div>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <div className="text-xs text-muted-foreground">Quiz Average</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Saved Roadmaps */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Roadmaps</h2>
              <Button asChild className="gradient-button">
                <Link to="/">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {roadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="glass-card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{roadmap.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatLastAccessed(roadmap.last_accessed)}
                          </span>
                          {roadmap.difficulty && (
                            <Badge variant="outline" className="text-xs">
                              {roadmap.difficulty}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/roadmap?goal=${encodeURIComponent(roadmap.goal)}`}>
                          Continue
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{roadmap.completed_steps}/{roadmap.total_steps} steps</span>
                      </div>
                      <Progress value={roadmap.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {roadmaps.length === 0 && (
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No roadmaps yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your first AI-generated learning roadmap to get started.
                    </p>
                    <Button asChild className="gradient-button">
                      <Link to="/">Create Your First Roadmap</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Card className="glass-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">AI Assistant</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ask questions about your learning path
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/chat">Open Chat</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">Take a Quiz</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Test your knowledge and track progress
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/quiz">Start Quiz</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card-hover">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold">Career Connect</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Explore career opportunities
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/career-connect">Explore Careers</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;