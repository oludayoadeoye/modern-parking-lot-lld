import React from 'react';
import { Car, Truck, Bike, Clock } from 'lucide-react';
import { Vehicle } from '../types/parking';

interface ActiveVehiclesProps {
  vehicles: Vehicle[];
  onExit: (licensePlate: string) => void;
}

export const ActiveVehicles: React.FC<ActiveVehiclesProps> = ({ vehicles, onExit }) => {
  const getVehicleIcon = (type: Vehicle['type']) => {
    switch (type) {
      case 'car':
        return <Car className="w-5 h-5 text-blue-600" />;
      case 'motorcycle':
        return <Bike className="w-5 h-5 text-purple-600" />;
      case 'truck':
        return <Truck className="w-5 h-5 text-orange-600" />;
    }
  };

  const getDuration = (entryTime: Date) => {
    const diff = new Date().getTime() - new Date(entryTime).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    return hours > 0 
      ? `${hours}h ${minutes % 60}m`
      : `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
      <h3 className="text-lg font-semibold mb-4">Parked Vehicles</h3>
      
      <div className="space-y-3">
        {vehicles.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No vehicles currently parked</p>
        ) : (
          vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getVehicleIcon(vehicle.type)}
                <div>
                  <p className="font-medium">{vehicle.licensePlate}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{getDuration(vehicle.entryTime)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onExit(vehicle.licensePlate)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Exit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};