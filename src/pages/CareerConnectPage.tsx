import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, TrendingUp, DollarSign, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface CareerPath {
  id: string;
  title: string;
  description: string;
  averageSalary: string;
  growthRate: string;
  demandLevel: "High" | "Medium" | "Low";
  requiredSkills: string[];
  relatedRoles: string[];
  topLocations: string[];
}

const CareerConnectPage = () => {
  const careerPaths: CareerPath[] = [
    {
      id: "1",
      title: "Frontend React Developer",
      description: "Build engaging user interfaces and web applications using React, JavaScript, and modern frontend technologies.",
      averageSalary: "$75,000 - $120,000",
      growthRate: "13%",
      demandLevel: "High",
      requiredSkills: ["React", "JavaScript", "HTML/CSS", "TypeScript", "Git", "API Integration"],
      relatedRoles: ["Full Stack Developer", "UI/UX Engineer", "Frontend Lead"],
      topLocations: ["San Francisco", "New York", "Seattle", "Austin", "Remote"]
    },
    {
      id: "2", 
      title: "Full Stack JavaScript Developer",
      description: "Work on both frontend and backend systems using JavaScript technologies like Node.js, React, and databases.",
      averageSalary: "$85,000 - $140,000",
      growthRate: "15%",
      demandLevel: "High",
      requiredSkills: ["React", "Node.js", "JavaScript", "Databases", "APIs", "DevOps"],
      relatedRoles: ["Software Engineer", "Tech Lead", "Solution Architect"],
      topLocations: ["San Francisco", "New York", "London", "Berlin", "Remote"]
    },
    {
      id: "3",
      title: "React Native Mobile Developer", 
      description: "Create cross-platform mobile applications using React Native for iOS and Android platforms.",
      averageSalary: "$80,000 - $130,000",
      growthRate: "18%",
      demandLevel: "High",
      requiredSkills: ["React Native", "React", "JavaScript", "Mobile UI", "App Store Deployment"],
      relatedRoles: ["Mobile App Developer", "Cross-platform Developer", "Mobile Lead"],
      topLocations: ["San Francisco", "Los Angeles", "New York", "Toronto", "Remote"]
    }
  ];

  const getDemandColor = (level: string) => {
    switch (level) {
      case "High": return "bg-green-500/20 text-green-400";
      case "Medium": return "bg-yellow-500/20 text-yellow-400";
      case "Low": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="glass-card p-8 rounded-2xl mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Career <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover real-world career opportunities and paths related to your React Developer learning journey.
          </p>
        </div>

        {/* Career Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card-hover">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">22%</div>
              <div className="text-sm text-muted-foreground">Average Job Growth</div>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-400 mb-2">$95k</div>
              <div className="text-sm text-muted-foreground">Average Salary</div>
            </CardContent>
          </Card>

          <Card className="glass-card-hover">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-2">50k+</div>
              <div className="text-sm text-muted-foreground">Open Positions</div>
            </CardContent>
          </Card>
        </div>

        {/* Career Paths */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Career Paths for React Developers</h2>
          
          {careerPaths.map((career) => (
            <Card key={career.id} className="glass-card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                    <p className="text-muted-foreground">{career.description}</p>
                  </div>
                  <Badge className={getDemandColor(career.demandLevel)}>
                    {career.demandLevel} Demand
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Salary and Growth */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-sm">Salary Range</span>
                    </div>
                    <div className="text-lg font-semibold">{career.averageSalary}</div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-sm">Job Growth</span>
                    </div>
                    <div className="text-lg font-semibold">{career.growthRate} annually</div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="font-medium mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Related Roles */}
                <div>
                  <h4 className="font-medium mb-3">Related Career Paths</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.relatedRoles.map((role) => (
                      <Badge key={role} className="bg-primary/20 text-primary text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Top Hiring Locations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {career.topLocations.map((location) => (
                      <Badge key={location} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button className="gradient-button" size="sm">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Find Jobs
                  </Button>
                  <Button variant="outline" size="sm">
                    View Salary Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Skill Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="glass-card mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to Take the Next Step?</h3>
            <p className="text-muted-foreground mb-6">
              Continue building your skills with our AI-powered learning roadmaps and stay ahead in your career journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="gradient-button">
                <Link to="/">Create New Roadmap</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerConnectPage;