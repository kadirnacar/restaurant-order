import config from '@config';
import { ITable, ICheck } from '@models';
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
    
    public static async getTableAdisyon(departmentCode: string, masaNo: string) {
        var result = await this.requestJson<AngusResponse<any>>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Object": "QA_EASYPOS_CHECKDETAIL",
                "Action": "Select",
                "Select": [
                    "ADET",
                    "ACIKLAMA",
                    "STOKID"
                ],
                "Where": [
                    {
                        "Column": "MASANO",
                        "Operator": "=",
                        "Value": masaNo
                    },
                    {
                        "Column": "DEPTKODU",
                        "Operator": "=",
                        "Value": departmentCode
                    },
                    {
                        "Column": "ADET",
                        "Operator": ">",
                        "Value": 0
                    }
                ],
                "Joins": [

                    {
                        "Object": "STOK",
                        "Key": "STOKID",
                        "Field": "STOKID",
                        "Fields": [
                            "PORSIYONLUSATIS"
                        ]
                    }
                ],
                "OrderBy": [
                    {
                        "Column": "BEKLET",
                        "Direction": "ASC"
                    },
                    {
                        "Column": "SIRA",
                        "Direction": "ASC"
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