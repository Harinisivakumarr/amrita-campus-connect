
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Coffee, Clock, DollarSign } from 'lucide-react';

type FoodItem = {
  id: string;
  name: string;
  price: number;
  available: boolean;
};

type CanteenCardProps = {
  id: string;
  name: string;
  location: string;
  openingHours: string;
  menu: FoodItem[];
};

const CanteenCard: React.FC<CanteenCardProps> = ({
  id,
  name,
  location,
  openingHours,
  menu
}) => {
  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{name}</h3>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground/70">
            <Coffee className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            <Clock className="mr-2 h-4 w-4" />
            <span>{openingHours}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Menu</h4>
          <div className="space-y-2">
            {menu.map((item) => (
              <div 
                key={item.id}
                className="flex justify-between items-center p-2 rounded-md bg-background/50"
              >
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium flex items-center">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {item.price.toFixed(2)}
                  </span>
                  <Badge 
                    variant={item.available ? "default" : "outline"}
                    className={item.available ? "bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20" : "text-foreground/50"}
                  >
                    {item.available ? 'Available' : 'Sold Out'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanteenCard;
