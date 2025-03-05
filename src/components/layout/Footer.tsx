
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-6 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-foreground/70">
              &copy; {currentYear} A-Reserve. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
