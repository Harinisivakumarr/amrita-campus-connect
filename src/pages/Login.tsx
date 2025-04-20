
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Amrita Campus Radar
            </span>
          </h1>
          <p className="text-foreground/70 mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Sign in to access your account
          </p>
        </div>
        
        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <AuthForm isLogin={true} />
        </div>
        
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-foreground/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
