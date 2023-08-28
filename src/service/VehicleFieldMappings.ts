export const VehicleProfileMapping = new Map<number, string>([
  [5, 'vehicleType'],
  [14, 'doors'],
  [26, 'make'],
  [28, 'model'],
  [29, 'modelYear'],
  [33, 'seats'],
  [38, 'trimLevel']
]);

export const VehicleEngineMapping = new Map<number, string>([
  [9, 'cylinder'],
  [13, 'displacement'],
  [18, 'manufacturerEngineCode'],
  [24, 'fuelType']
]);

export const VehicleTransmissionMapping = new Map<number, string>([
  [15, 'drivetrain'],
  [37, 'type'],
  [63, 'numberOfSpeeds'],
]);
