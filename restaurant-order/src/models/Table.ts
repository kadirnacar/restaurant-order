export interface ITable {
  ID: number;
  DEPID: number;
  TABLENO: string;
  TABLEGROUP: string;
  NOTES?: any;
  HOTELID: number;
  PORTALID: number;
  PAXCOUNT: number;
  STATE: string;
  XPOS?: any;
  YPOS?: any;
  MIGRATIONKEY: string;
  Check?: ICheck;
}

export interface ICheck {
  CHECKID?: number;
  TABLENO?: string;
  PEOPLECOUNT?: number;
  WAITERNAME?: string;
  OPENTIME?: Date;
  CHECKTOTAL?: number;
  HOTELID?: number;
  PORTALID?: number;
  DEPID?: number;
  STATEID?: number;
  STATE?: any;
  NOTES?: any;
  LASTORDERTIME?: any;
  ISATTENDED?: boolean;
}
