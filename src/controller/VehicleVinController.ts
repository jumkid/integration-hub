import restfulClient from '../service/RestfulClient';
import { VehicleResponse, VPICResultResponse } from '../service/model/Response';
import * as _ from 'lodash';
import logger from '../logging/logger';

const writeJson = (res:any, vehicleResponse:VehicleResponse) => {
    res.json({
        make: vehicleResponse.make,
        model: vehicleResponse.model,
        modeYear: vehicleResponse.modelYear,
        trimLevel: vehicleResponse.trimLevel
    });
};

const ActivityController = {

    getInfoByVin: (req: any, res: any) => {
        const vin = req.params.vin;
        const url = process.env.VIN_DECODE_API;
        const vehicleResponse:VehicleResponse = { make: 'N/A', model: 'N/A', modelYear: 1900, trimLevel: 'N/A'};

        const response = restfulClient.getWithPromise(`${url}/${vin}?format=json`).then(
          (response) => {
              if (response.status === 200) {
                  response.data.Results.map((result:VPICResultResponse)=>{
                      const variable = result.Variable.toLowerCase();
                      const value = result.Value;
                      if(variable === "make") vehicleResponse.make = value;
                      else if (variable === "model" && !_.isNull(value)) vehicleResponse.model = value;
                      else if (variable === "model year" && !_.isNull(value)) vehicleResponse.modelYear = Number(value);
                      else if (variable === "series" && !_.isNull(value)) vehicleResponse.trimLevel = value;
                      else if (variable === "trim" && !_.isNull(value)) vehicleResponse.trimLevel = value;
                  });

                  logger.debug("get vehicle response {}", vehicleResponse);
                  writeJson(res, vehicleResponse);
              }
          }
        )
    }

};

export default ActivityController;
