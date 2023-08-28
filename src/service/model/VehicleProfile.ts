import { VehicleEngine } from './VehicleEngine';
import { VehicleTransmission } from './VehicleTransmission';

export interface VehicleProfile {
  make:string
  model:string
  modelYear:number
  trimLevel:string
  vehicleType:string
  seats:number
  doors:number

  vehicleEngine: VehicleEngine
  vehicleTransmission: VehicleTransmission
}

export const blankVehicleProfile:VehicleProfile = {
  make: 'N/A',
  model: 'N/A',
  modelYear: 1900,
  trimLevel: 'N/A',
  seats:0,
  doors:4,
  vehicleType:'N/A',

  vehicleEngine: {
    cylinder: 0,
    displacement: 0,
    fuelType: null,
    horsepower: null,
    horsepowerRpm: null,
    torque: null,
    torqueRpm: null,
    manufacturerEngineCode: null
  },

  vehicleTransmission: {
    type: null,
    drivetrain: null,
    availability: null,
    automaticType: null,
    numberOfSpeeds: null
  }
}