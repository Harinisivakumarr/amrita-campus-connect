
import React, { useState } from 'react';
import CanteenCard from '@/components/dashboard/CanteenCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for canteens
const mockCanteens = [
  {
    id: '1',
    name: 'Main Cafeteria',
    location: 'Student Center, Ground Floor',
    openingHours: '8:00 AM - 8:00 PM',
    menu: [
      { id: '1-1', name: 'Vegetable Sandwich', price: 3.50, available: true },
      { id: '1-2', name: 'Chicken Burger', price: 4.99, available: true },
      { id: '1-3', name: 'French Fries', price: 2.50, available: true },
      { id: '1-4', name: 'Chocolate Brownie', price: 2.25, available: false },
    ]
  },
  {
    id: '2',
    name: 'Engineering Block Café',
    location: 'Engineering Block, First Floor',
    openingHours: '9:00 AM - 5:00 PM',
    menu: [
      { id: '2-1', name: 'Coffee', price: 1.99, available: true },
      { id: '2-2', name: 'Tea', price: 1.50, available: true },
      { id: '2-3', name: 'Muffin', price: 2.00, available: true },
      { id: '2-4', name: 'Pasta', price: 5.50, available: false },
    ]
  },
  {
    id: '3',
    name: 'Library Snack Corner',
    location: 'Central Library, Second Floor',
    openingHours: '10:00 AM - 6:00 PM',
    menu: [
      { id: '3-1', name: 'Chips', price: 1.25, available: true },
      { id: '3-2', name: 'Cookies', price: 1.99, available: true },
      { id: '3-3', name: 'Cold Coffee', price: 2.50, available: false },
      { id: '3-4', name: 'Fruit Salad', price: 3.99, available: true },
    ]
  }
];

const Canteen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter canteens based on search
  const filteredCanteens = mockCanteens.filter(canteen => {
    const matchesSearch = canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         canteen.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'breakfast' && canteen.menu.some(item => ['Coffee', 'Tea', 'Muffin'].includes(item.name))) || 
                      (activeTab === 'lunch' && canteen.menu.some(item => ['Vegetable Sandwich', 'Chicken Burger', 'Pasta'].includes(item.name))) || 
                      (activeTab === 'snacks' && canteen.menu.some(item => ['Chips', 'Cookies', 'French Fries'].includes(item.name)));
    
    return matchesSearch && matchesTab;
  });

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Canteen Services</h1>
        <p className="text-foreground/70 animate-slide-up">
          Browse menus and check food availability from campus canteens.
        </p>
      </div>

      {/* Search and tabs */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60 h-4 w-4" />
          <Input
            placeholder="Search canteens or menu items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Canteens grid */}
      {filteredCanteens.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCanteens.map((canteen, index) => (
            <div key={canteen.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <CanteenCard {...canteen} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card animate-fade-in">
          <h3 className="text-xl font-medium mb-2">No Canteens Found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Canteen;
