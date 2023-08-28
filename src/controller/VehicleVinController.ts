import vehicleInfoService from '../service/VehicleInfoService';
import { VehicleProfile } from '../service/model/VehicleProfile';

const writeJson = (res:any, vehicleResponse:VehicleProfile) => {
    res.json(vehicleResponse);
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
