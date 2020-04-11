import config from '@config';
import { IStaff } from '@models';
import { AngusFunctionResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class StaffService extends ServiceBase {
    public static async getItem(id: number) {

        var result = await this.requestJson<AngusFunctionResponse<IStaff>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Function",
                "Object": "FN_POS_STAFFJSON",
                "Parameters": {
                    "STAFFID": id
                }
            }
        });
        return result;
    }
}