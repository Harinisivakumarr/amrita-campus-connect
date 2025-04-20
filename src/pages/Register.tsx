
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

const Register: React.FC = () => {
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
            Create your Amrita Campus Radar account
          </p>
        </div>
        
        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <AuthForm isLogin={false} />
        </div>
        
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-foreground/70">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
