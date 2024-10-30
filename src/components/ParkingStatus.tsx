import React from 'react';
import { Car, Truck, Bike } from 'lucide-react';

interface StatusProps {
  availability: {
    level: number;
    available: {
      car: number;
      motorcycle: number;
      truck: number;
    };
    capacity: {
      car: number;
      motorcycle: number;
      truck: number;
    };
  }[];
}

export const ParkingStatus: React.FC<StatusProps> = ({ availability }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {availability.map(({ level, available, capacity }) => (
        <div key={level} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Level {level}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                <span>Cars</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{available.car}</span>
                <span className="text-gray-500">/{capacity.car}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bike className="w-5 h-5 text-purple-600" />
                <span>Motorcycles</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{available.motorcycle}</span>
                <span className="text-gray-500">/{capacity.motorcycle}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-600" />
                <span>Trucks</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-green-600">{available.truck}</span>
                <span className="text-gray-500">/{capacity.truck}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};