
import React, { useState } from 'react';
import FacultyCard from '@/components/dashboard/FacultyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { toast } from "sonner";

// Mock data for faculty
const mockFaculty = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    email: 'sarah.johnson@example.edu',
    phone: '(123) 456-7890',
    status: 'available' as const,
    availableHours: 'Mon-Fri, 10:00 AM - 12:00 PM',
  },
  {
    id: '2',
    name: 'Prof. Michael Lee',
    department: 'Electrical Engineering',
    email: 'michael.lee@example.edu',
    phone: '(123) 456-7891',
    status: 'busy' as const,
    availableHours: 'Tue-Thu, 2:00 PM - 4:00 PM',
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    department: 'Mathematics',
    email: 'emily.chen@example.edu',
    phone: '(123) 456-7892',
    status: 'available' as const,
    availableHours: 'Mon-Wed, 9:00 AM - 11:00 AM',
  },
  {
    id: '4',
    name: 'Prof. David Wilson',
    department: 'Physics',
    email: 'david.wilson@example.edu',
    phone: '(123) 456-7893',
    status: 'offline' as const,
    availableHours: 'Fri, 1:00 PM - 5:00 PM',
  },
  {
    id: '5',
    name: 'Dr. Rachel Kim',
    department: 'Biology',
    email: 'rachel.kim@example.edu',
    phone: '(123) 456-7894',
    status: 'available' as const,
    availableHours: 'Mon-Fri, 11:00 AM - 1:00 PM',
  },
  {
    id: '6',
    name: 'Prof. James Garcia',
    department: 'Chemistry',
    email: 'james.garcia@example.edu',
    phone: '(123) 456-7895',
    status: 'busy' as const,
    availableHours: 'Tue-Thu, 3:00 PM - 5:00 PM',
  },
];

const Faculty: React.FC = () => {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleScheduleMeeting = (facultyId: string) => {
    toast.success("Meeting request sent successfully!");
  };

  // Get unique departments for filter
  const departments = [...new Set(mockFaculty.map(item => item.department))];

  // Filter faculty based on search and filters
  const filteredFaculty = faculty.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          person.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          person.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || person.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Faculty Availability</h1>
        <p className="text-foreground/70 animate-slide-up">
          Check faculty availability and schedule meetings with professors.
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
            <Input
              placeholder="Search by name, department, or email..."
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
                <Label htmlFor="department-filter">Department</Label>
                <Select
                  value={departmentFilter}
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger id="department-filter">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(department => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="busy">Busy</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Faculty grid */}
      {filteredFaculty.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((person, index) => (
            <div key={person.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <FacultyCard
                {...person}
                onScheduleMeeting={handleScheduleMeeting}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card animate-fade-in">
          <h3 className="text-xl font-medium mb-2">No Faculty Found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Faculty;
