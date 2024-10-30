import React, { useState } from 'react';
import { Car, Truck, Bike } from 'lucide-react';
import { VehicleType } from '../types/parking';

interface ParkingFormProps {
  onPark: (data: { type: VehicleType; licensePlate: string }) => void;
}

export const ParkingForm: React.FC<ParkingFormProps> = ({ onPark }) => {
  const [type, setType] = useState<VehicleType>('car');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (licensePlate.trim()) {
      onPark({ type, licensePlate });
      setLicensePlate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">Park a Vehicle</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setType('car')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
              type === 'car' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <Car className={`w-6 h-6 ${type === 'car' ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className="text-sm mt-1">Car</span>
          </button>
          
          <button
            type="button"
            onClick={() => setType('motorcycle')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
              type === 'motorcycle' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <Bike className={`w-6 h-6 ${type === 'motorcycle' ? 'text-purple-500' : 'text-gray-500'}`} />
            <span className="text-sm mt-1">Motorcycle</span>
          </button>
          
          <button
            type="button"
            onClick={() => setType('truck')}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors ${
              type === 'truck' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-200'
            }`}
          >
            <Truck className={`w-6 h-6 ${type === 'truck' ? 'text-orange-500' : 'text-gray-500'}`} />
            <span className="text-sm mt-1">Truck</span>
          </button>
        </div>

        <div>
          <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter license plate"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Park Vehicle
        </button>
      </div>
    </form>
  );
};