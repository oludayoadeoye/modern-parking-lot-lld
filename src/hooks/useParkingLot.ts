import { useState, useCallback } from 'react';
import { Vehicle, ParkingSpot, VehicleType, ParkingLevel } from '../types/parking';

const INITIAL_LEVELS: ParkingLevel[] = [
  {
    level: 1,
    capacity: { car: 20, motorcycle: 10, truck: 5 },
    spots: Array.from({ length: 35 }, (_, i) => ({
      id: `L1-${i}`,
      level: 1,
      number: i + 1,
      type: i < 20 ? 'car' : i < 30 ? 'motorcycle' : 'truck',
      isOccupied: false
    }))
  },
  {
    level: 2,
    capacity: { car: 25, motorcycle: 15, truck: 5 },
    spots: Array.from({ length: 45 }, (_, i) => ({
      id: `L2-${i}`,
      level: 2,
      number: i + 1,
      type: i < 25 ? 'car' : i < 40 ? 'motorcycle' : 'truck',
      isOccupied: false
    }))
  }
];

export const useParkingLot = () => {
  const [levels, setLevels] = useState<ParkingLevel[]>(INITIAL_LEVELS);
  const [activeVehicles, setActiveVehicles] = useState<Vehicle[]>([]);

  const findAvailableSpot = useCallback((vehicleType: VehicleType) => {
    for (const level of levels) {
      const spot = level.spots.find(s => s.type === vehicleType && !s.isOccupied);
      if (spot) return spot;
    }
    return null;
  }, [levels]);

  const parkVehicle = useCallback((vehicle: Omit<Vehicle, 'id' | 'entryTime'>) => {
    const spot = findAvailableSpot(vehicle.type);
    if (!spot) return false;

    const newVehicle: Vehicle = {
      ...vehicle,
      id: Math.random().toString(36).substr(2, 9),
      entryTime: new Date()
    };

    setLevels(prev => prev.map(level => ({
      ...level,
      spots: level.spots.map(s => 
        s.id === spot.id ? { ...s, isOccupied: true, vehicle: newVehicle } : s
      )
    })));

    setActiveVehicles(prev => [...prev, newVehicle]);
    return true;
  }, [findAvailableSpot]);

  const removeVehicle = useCallback((licensePlate: string) => {
    setLevels(prev => prev.map(level => ({
      ...level,
      spots: level.spots.map(s => 
        s.vehicle?.licensePlate === licensePlate 
          ? { ...s, isOccupied: false, vehicle: undefined } 
          : s
      )
    })));

    setActiveVehicles(prev => 
      prev.filter(v => v.licensePlate !== licensePlate)
    );
  }, []);

  const getAvailability = useCallback(() => {
    return levels.map(level => ({
      level: level.level,
      available: {
        car: level.spots.filter(s => s.type === 'car' && !s.isOccupied).length,
        motorcycle: level.spots.filter(s => s.type === 'motorcycle' && !s.isOccupied).length,
        truck: level.spots.filter(s => s.type === 'truck' && !s.isOccupied).length,
      },
      capacity: level.capacity
    }));
  }, [levels]);

  return {
    levels,
    activeVehicles,
    parkVehicle,
    removeVehicle,
    getAvailability
  };
};