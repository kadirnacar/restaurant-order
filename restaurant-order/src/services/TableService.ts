import config from '@config';
import { ITable, ICheck, ICheckDetail } from '@models';
import { AngusResponse } from './AngusResponse';
import { ServiceBase } from "./ServiceBase";

export class TableService extends ServiceBase {
    public static async getTables() {
        var result = await this.requestJson<AngusResponse<ITable>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "POS_TABLE",
                "Action": "Select",
                "Select": [],
                "Paging": {
                    "Current": 1,
                    "ItemsPerPage": 9999
                }
            }
        });

        return result;
    }

    public static async getOpenedTables(depId: number) {
        var result = await this.requestJson<AngusResponse<ICheck>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "QPOS_OPEN_TABLES",
                "Action": "Select",
                "Select": [
                 
                ],
                "Where": [
                    {
                        "Column": "DEPID",
                        "Operator": "=",
                        "Value": depId
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
    
    public static async getCheckDetail(checkId: number) {
        var result = await this.requestJson<AngusResponse<ICheckDetail>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "QPOS_CHECK_DETAIL",
                "Action": "Select",
                "Select": [
                  
                ],
                "Where": [
                    {
                        "Column": "CHECKID",
                        "Operator": "=",
                        "Value": checkId
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