
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BookOpen, Coffee, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Classroom Availability',
    description: 'Real-time updates on classroom availability across campus.',
    link: '/classrooms'
  },
  {
    icon: <Coffee className="h-8 w-8 text-primary" />,
    title: 'Canteen Services',
    description: 'Browse menus and check food availability from campus canteens.',
    link: '/canteen'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Faculty Availability',
    description: 'Find faculty members and check their availability for meetings.',
    link: '/faculty'
  }
];

const Index: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Amrita Campus Radar
              </span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-slide-up">
              A simplified platform for managing classroom reservations, canteen services, and faculty availability at your college.
            </p>
            
            {user ? (
              <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/classrooms">
                  <Button size="lg" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Explore Classrooms
                  </Button>
                </Link>
                <Link to="/canteen">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Coffee className="h-5 w-5" />
                    View Canteen
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/login">
                  <Button size="lg">
                    Login to Get Started
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline">
                    Create an Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Amrita Campus Radar Offers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 flex flex-col items-center text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-foreground/70 mb-4">{feature.description}</p>
                {user && (
                  <Link to={feature.link} className="mt-auto">
                    <Button variant="ghost" className="gap-1">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
