import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, Brain, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: "1",
      question: "What is the primary purpose of React hooks?",
      options: [
        "To replace class components entirely",
        "To allow state and lifecycle features in functional components",
        "To improve performance only",
        "To handle routing in React applications"
      ],
      correctAnswer: 1
    },
    {
      id: "2", 
      question: "Which hook is used for managing component state?",
      options: [
        "useEffect",
        "useContext",
        "useState",
        "useReducer"
      ],
      correctAnswer: 2
    },
    {
      id: "3",
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax Extension",
        "JavaScript Extension",
        "Java XML"
      ],
      correctAnswer: 0
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto">
            <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>

            <Card className="glass-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold mb-4">Quiz Complete!</h1>
                <p className="text-muted-foreground mb-8">
                  Great job! You've completed the React Developer quiz.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="glass-card p-6 rounded-xl">
                    <div className="text-3xl font-bold gradient-text mb-2">{score}%</div>
                    <div className="text-sm text-muted-foreground">Final Score</div>
                  </div>
                  <div className="glass-card p-6 rounded-xl">
                    <div className="text-3xl font-bold text-green-400 mb-2">{correctAnswers}/{questions.length}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button onClick={restartQuiz} className="gradient-button w-full md:w-auto">
                    Retake Quiz
                  </Button>
                  <Button variant="outline" asChild className="w-full md:w-auto">
                    <Link to="/dashboard">Back to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">React Developer Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-4 glass-card rounded-lg hover:bg-white/10 transition-colors">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between items-center pt-6">
                <Button 
                  variant="outline" 
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                  className="gradient-button"
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;