import config from '@config';
import { ServiceBase } from "./ServiceBase";

export class StokService extends ServiceBase {
    public static async getItems() {
       
        var result = await this.requestJson<any>({
            url: `${config.restUrl}`,
            method: "POST",
            data: {
                "Action": "Execute",
                "Object": "SP_POS_GETPOSDATA"
            }
        });
console.log(result)
        return result;
    }
}