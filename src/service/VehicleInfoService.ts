import { VehicleResponse, VPICResultResponse } from './model/Response';
import restfulClient from './RestfulClient';
import * as _ from 'lodash';
import logger from '../logging/logger';

interface IVehicleInfoService {
  getInfoByVin(vin:string):Promise<VehicleResponse>
}

class VehicleInfoService implements IVehicleInfoService {

  async getInfoByVin (vin: string): Promise<VehicleResponse> {
    const url = process.env.VIN_DECODE_API;

    const vehicleResponse:VehicleResponse = {
      make: 'N/A',
      model: 'N/A',
      modelYear: 1900,
      trimLevel: 'N/A',
      numberOfCylinders: 0,
      drivetrain: 'N/A'
    };

    const response = await restfulClient.getWithPromise(`${url}/${vin}?format=json`);
    if (response.status === 200) {
      response.data.Results.map((result:VPICResultResponse)=>{
        const variable = result.Variable.toLowerCase();
        const value = result.Value;
        if(variable === "make") vehicleResponse.make = value;
        else if (variable === "model" && !_.isNull(value)) vehicleResponse.model = value;
        else if (variable === "model year" && !_.isNull(value)) vehicleResponse.modelYear = Number(value);
        else if (variable === "series" && !_.isNull(value)) vehicleResponse.trimLevel = value;
        else if (variable === "trim" && !_.isNull(value)) vehicleResponse.trimLevel = value;
        else if (variable === "engine number of cylinders" && !_.isNull(value)) vehicleResponse.numberOfCylinders = Number(value);
        else if (variable === "drive type" && !_.isNull(value)) vehicleResponse.drivetrain = value;
      });

      logger.debug("get vehicle response {}", vehicleResponse);
    }
    return vehicleResponse;
  }

}

export default new VehicleInfoService();
