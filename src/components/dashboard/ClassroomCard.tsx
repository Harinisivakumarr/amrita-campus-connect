
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';

type ClassroomCardProps = {
  id: string;
  name: string;
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'maintenance';
  timeSlot?: string;
  onReserve?: (id: string) => void;
  onRelease?: (id: string) => void;
};

const ClassroomCard: React.FC<ClassroomCardProps> = ({
  id,
  name,
  capacity,
  location,
  status,
  timeSlot,
  onReserve,
  onRelease,
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'occupied':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'maintenance':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium">{name}</h3>
          <Badge className={`uppercase text-xs font-medium ${getStatusStyle()}`}>
            {status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground/70">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Capacity: {capacity} people</span>
          </div>
          
          {timeSlot && (
            <div className="flex items-center text-sm text-foreground/70">
              <Clock className="mr-2 h-4 w-4" />
              <span>{timeSlot}</span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2 mt-3">
          {status === 'available' && onReserve && (
            <Button 
              onClick={() => onReserve(id)}
              className="w-full"
              size="sm"
            >
              Reserve
            </Button>
          )}
          
          {status === 'occupied' && onRelease && (
            <Button 
              onClick={() => onRelease(id)}
              variant="outline" 
              className="w-full"
              size="sm"
            >
              Release
            </Button>
          )}
          
          {status === 'maintenance' && (
            <Button 
              disabled
              className="w-full opacity-50 cursor-not-allowed"
              size="sm"
            >
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;
