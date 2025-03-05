
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ClassroomCard from '@/components/dashboard/ClassroomCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, Filter } from 'lucide-react';
import { toast } from "sonner";

// Mock data for classroom availability
const mockClassrooms = [
  {
    id: '1',
    name: 'AB2 201',
    capacity: 40,
    location: 'Academic Block 2, Second Floor',
    status: 'available' as const,
  },
  {
    id: '2',
    name: 'AB1 102',
    capacity: 60,
    location: 'Academic Block 1, First Floor',
    status: 'occupied' as const,
    timeSlot: '10:00 AM - 11:30 AM',
  },
  {
    id: '3',
    name: 'LH 302',
    capacity: 120,
    location: 'Lecture Hall, Third Floor',
    status: 'available' as const,
  },
  {
    id: '4',
    name: 'MB 101',
    capacity: 30,
    location: 'Main Building, First Floor',
    status: 'maintenance' as const,
  },
  {
    id: '5',
    name: 'CS Lab 204',
    capacity: 45,
    location: 'Computer Science Block, Second Floor',
    status: 'available' as const,
  },
  {
    id: '6',
    name: 'EC Lab 305',
    capacity: 35,
    location: 'Electronics Block, Third Floor',
    status: 'occupied' as const,
    timeSlot: '09:00 AM - 12:00 PM',
  },
];

const Classrooms: React.FC = () => {
  const { user } = useAuth();
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleReserveRoom = (roomId: string) => {
    setClassrooms(prevClassrooms => 
      prevClassrooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'occupied' as const, timeSlot: '12:00 PM - 01:30 PM' } 
          : room
      )
    );
    toast.success("Classroom reserved successfully!");
  };

  const handleReleaseRoom = (roomId: string) => {
    setClassrooms(prevClassrooms => 
      prevClassrooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'available' as const, timeSlot: undefined } 
          : room
      )
    );
    toast.success("Classroom released successfully!");
  };

  // Filter classrooms based on search and status filter
  const filteredClassrooms = classrooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Classroom Availability</h1>
        <p className="text-foreground/70 animate-slide-up">
          View and manage classrooms across campus in real-time.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
            <Input
              placeholder="Search by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="md:w-auto w-full flex items-center gap-2"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {isFiltersOpen && (
          <div className="glass p-4 rounded-lg mb-4 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="status-filter">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="date-filter">Date</Label>
                <div className="flex">
                  <Input
                    id="date-filter"
                    type="date"
                    className="flex-1"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="capacity-filter">Min. Capacity</Label>
                <Input
                  id="capacity-filter"
                  type="number"
                  min="0"
                  placeholder="Minimum capacity"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Classrooms grid */}
      {filteredClassrooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassrooms.map((classroom, index) => (
            <div key={classroom.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <ClassroomCard
                {...classroom}
                onReserve={user?.role === 'student' || user?.role === 'faculty' || user?.role === 'admin' ? handleReserveRoom : undefined}
                onRelease={user?.role === 'faculty' || user?.role === 'admin' ? handleReleaseRoom : undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card animate-fade-in">
          <h3 className="text-xl font-medium mb-2">No Classrooms Found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Classrooms;
