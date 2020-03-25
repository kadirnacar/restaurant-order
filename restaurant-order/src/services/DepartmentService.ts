import config from '@config';
import { ServiceBase } from "./ServiceBase";
import { AngusResponse } from './AngusResponse';
import { IDepartment } from 'src/models/Department';

export class DepartmentService extends ServiceBase {
    public static async getItems() {
      
        var result = await this.requestJson<AngusResponse<IDepartment>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Select",
                "Object": "HOTEL_DEPARTMENT",
                "Select": [
                   
                ],
                "Where": [
                    {
                        "Column": "DEPTTYPE",
                        "Operator": "=",
                        "Value": "2"
                    },
                    {
                        "Column": "MOBILPOSACTIVE",
                        "Operator": "=",
                        "Value": "1"
                    }
                ],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });
        return result;
    }
}