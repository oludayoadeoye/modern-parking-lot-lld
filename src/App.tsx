import React from 'react';
import { ParkingStatus } from './components/ParkingStatus';
import { ParkingForm } from './components/ParkingForm';
import { ActiveVehicles } from './components/ActiveVehicles';
import { useParkingLot } from './hooks/useParkingLot';
import { Warehouse } from 'lucide-react';

function App() {
  const { parkVehicle, removeVehicle, getAvailability, activeVehicles } = useParkingLot();

  const handlePark = (data: Parameters<typeof parkVehicle>[0]) => {
    const success = parkVehicle(data);
    if (!success) {
      alert('No available spots for this vehicle type!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Warehouse className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Smart Parking System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ParkingStatus availability={getAvailability()} />
            <ActiveVehicles vehicles={activeVehicles} onExit={removeVehicle} />
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <ParkingForm onPark={handlePark} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;