
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Clock, Phone, Calendar } from 'lucide-react';

type FacultyCardProps = {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  status: 'available' | 'busy' | 'offline';
  availableHours?: string;
  onScheduleMeeting?: (id: string) => void;
};

const FacultyCard: React.FC<FacultyCardProps> = ({
  id,
  name,
  department,
  email,
  phone,
  status,
  availableHours,
  onScheduleMeeting,
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'busy':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'offline':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
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
            <User className="mr-2 h-4 w-4" />
            <span>{department}</span>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            <Mail className="mr-2 h-4 w-4" />
            <span>{email}</span>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            <Phone className="mr-2 h-4 w-4" />
            <span>{phone}</span>
          </div>
          
          {availableHours && (
            <div className="flex items-center text-sm text-foreground/70">
              <Clock className="mr-2 h-4 w-4" />
              <span>{availableHours}</span>
            </div>
          )}
        </div>
        
        {onScheduleMeeting && status !== 'offline' && (
          <Button 
            onClick={() => onScheduleMeeting(id)}
            className="w-full flex items-center justify-center space-x-1"
            size="sm"
            variant={status === 'available' ? "default" : "outline"}
            disabled={status === 'busy'}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span>Schedule Meeting</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
