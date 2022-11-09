import { VehicleResponse } from '../service/model/Response';
import vehicleInfoService from '../service/VehicleInfoService';

const writeJson = (res:any, vehicleResponse:VehicleResponse) => {
    res.json({
        make: vehicleResponse.make,
        model: vehicleResponse.model,
        modelYear: vehicleResponse.modelYear,
        trimLevel: vehicleResponse.trimLevel,
        numberOfCylinders: vehicleResponse.numberOfCylinders,
        drivetrain: vehicleResponse.drivetrain
    });
};

const ActivityController = {

    vinDecode: (req: any, res: any) => {
        const vin = req.params.vin;
        const vehicleResponse = vehicleInfoService.getInfoByVin(vin).then(
          (vehicleResponse) => {
              writeJson(res, vehicleResponse);
          }
        );
    }

};

export default ActivityController;
