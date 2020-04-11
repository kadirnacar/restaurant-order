export interface Tenancy {
    GENDARMEDEFAULTID: string;
    SUBDOMAIN: string;
    INTERNALCHATENABLED: boolean;
    INTERNALCHATUSERNAME?: any;
    INTERNALCHATPASSWORD?: any;
    DOORKEYCARDMODE: number;
    TENANTEMAIL: string;
    TENANTPHONE: string;
    TENANTNAME: string;
    TENANTLOGOURL: string;
    DEFAULTCASHDEPARTMENTID: number;
    DEFAULTCASHDEPARTMENT: string;
    DEFAULTCURRENCYID: number;
    DEFAULTCURRENCY: string;
    POSCURRENCYID?: any;
    POSCURRENCY?: any;
    RATECURRENCYID: number;
    RATECURRENCYCODE: string;
    PORTALID: number;
    PROGDATE: string;
    TAWKTOUSERCODE: string;
    CHECKINTIME: string;
    CHECKOUTTIME: string;
    ALLROLES: string;
    TENANTCHANGEDSP: string;
    POSMODE: string;
    LANGUAGES: string;
    DEFAULTLANGUAGE: string;
    KBSMODE: number;
    KBSCODE: string;
    KBSPASSWORD: string;
    KBSAUTO: boolean;
    ONLINEAGENCYID: number;
    ONLINERATECODEID: number;
    ONLINEAGENCYCODE: string;
    DEFAULTRATETYPEID: number;
    DEFAULTBOARDTYPEID: number;
    DEFAULTBOARDTYPE: string;
    DEFAULTRATETYPE: string;
    ONLINERATECODE: string;
    APIKEYS: string;
    ACCOUNTID_MAINSAFE: number;
    ACCOUNT_MAINSAFE: string;
    ACCOUNTID_CREDITCARD: number;
    ACCOUNT_CREDITCARD: string;
    ACCOUNTID_BANK: number;
    ACCOUNT_BANK: string;
    EINVOICEENABLED: boolean;
    USEREMINDER?: any;
    GROUPHOTELCOUNT: number;
    STDUSERID: number;
    HOTELID: number;
    GARSONID: number;
}

export interface IUser {
    Success: boolean;
    LoginToken: string;
    Usercode: string;
    RoleName: string;
    AdminLevel: number;
    TenantColumn: string;
    TenantTable: string;
    Tenancy: Tenancy;
}
