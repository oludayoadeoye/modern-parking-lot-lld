export type VehicleType = 'car' | 'motorcycle' | 'truck';

export interface Vehicle {
  id: string;
  type: VehicleType;
  licensePlate: string;
  entryTime: Date;
}

export interface ParkingSpot {
  id: string;
  level: number;
  number: number;
  type: VehicleType;
  isOccupied: boolean;
  vehicle?: Vehicle;
}

export interface ParkingLevel {
  level: number;
  spots: ParkingSpot[];
  capacity: {
    car: number;
    motorcycle: number;
    truck: number;
  };
}