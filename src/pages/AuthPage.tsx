import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Default redirect to login page
  useEffect(() => {
    navigate('/auth/login');
  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-elegant border-white/10 backdrop-blur-sm bg-background/80">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold gradient-text">
              Welcome to LearnMate
            </CardTitle>
            <CardDescription>
              Your AI-powered learning companion
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Redirecting to login page...
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/auth/login')}
                className="w-full"
              >
                Go to Login
              </Button>
              <Button 
                onClick={() => navigate('/auth/signup')}
                variant="outline"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;