import { VPICResultResponse } from './model/Response';
import restfulClient from './RestfulClient';
import * as _ from 'lodash';
import logger from '../logging/logger';
import { VehicleProfileMapping, VehicleEngineMapping, VehicleTransmissionMapping } from './VehicleFieldMappings';
import { blankVehicleProfile, VehicleProfile } from './model/VehicleProfile';

interface IVehicleInfoService {
  getInfoByVin(vin:string):Promise<VehicleProfile>
}

class VehicleInfoService implements IVehicleInfoService {

  async getInfoByVin (vin: string): Promise<VehicleProfile> {
    const url = process.env.VIN_DECODE_API;

    const vehicleResponse:VehicleProfile = blankVehicleProfile;

    const response = await restfulClient.getWithPromise(`${url}/${vin}?format=json`);
    if (response.status === 200) {
      response.data.Results.map((result:VPICResultResponse)=>{
        const variableId = result.VariableId;
        const value = result.Value;
        if (VehicleProfileMapping.has(variableId)) {
          const propName = VehicleProfileMapping.get(variableId);
          if (!_.isNil(propName) && vehicleResponse.hasOwnProperty(propName)) {
            // @ts-ignore
            vehicleResponse[propName] = value;
          }
        }

        if (VehicleEngineMapping.has(variableId)) {
          const propName = VehicleEngineMapping.get(variableId);
          if (!_.isNil(propName) && vehicleResponse.vehicleEngine.hasOwnProperty(propName)) {
            // @ts-ignore
            vehicleResponse.vehicleEngine[propName] = value;
          }
        }

        if (VehicleTransmissionMapping.has(variableId)) {
          const propName = VehicleTransmissionMapping.get(variableId);
          if (!_.isNil(propName) && vehicleResponse.vehicleTransmission.hasOwnProperty(propName)) {
            // @ts-ignore
            vehicleResponse.vehicleTransmission[propName] = value;
          }
        }

      });

      logger.debug("get vehicle response {}", vehicleResponse);
    }
    return vehicleResponse;
  }

}

export default new VehicleInfoService();
