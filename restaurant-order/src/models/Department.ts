export interface IDepartment {
    ID: number;
    DEPCODE: string;
    DEPARTMENTNAME: string;
    DEPTTYPE: number;
    HOTELID: number;
    ISDISABLED?: boolean;
    ISDELETED: boolean;
    CREATION_DATE: Date;
    LASTUPDATE_DATE: Date;
    PORTALID: number;
    CODE?: any;
    MOBILPOSCONFIG: string;
    MobilPosConfigObject: IMobilPosConfig;
    POSCHECKPRINTER: string;
    POSORDERPRINTER1: string;
    POSORDERPRINTER2: string;
    POSORDERPRINTER3: string;
    POSORDERPRINTER4: string;
    POSINVOICEPRINTER: string;
    ACCOUNTCODE?: any;
    DEFAULTREVID: number;
    REVCODES: string;
    FOODSTOREID: number;
    BEVERAGESTOREID: number;
    MOBILPOSACTIVE: boolean;
    SHOWINBOXOFFICE?: any;
    PARKTENANTID?: any;
    AIENABLED: boolean;
}

export interface IMobilPosConfig {
    krediKarti: boolean;
    yazdir: boolean;
    kaydet: boolean;
    nakit: boolean;
    odaHesabi: boolean;
    iptal: boolean;
    masaNoKullan: boolean;
    posBildirimAktif: boolean;
    parcaliOdeme: boolean;
    cariKullan: boolean;
    indirim: boolean;
    fiyatDegistir: boolean;
    servisUcreti: boolean;
    otoMasaYenile: boolean;
    otoAdisyonOku: boolean;
    kapaliCekCagir: boolean;
    garsonSipEkrani: boolean;
    mutfakSipEkrani: boolean;
    kapaliCekteOdemeDegistir: boolean;
    folyoIcinMasaZorunlu: boolean;
    adisyonYazdirilmissaMasayiKilitle2: boolean;
    garsonHasilatRaporu: boolean;
    masaKapatildigindaAdisyonYaz: boolean;
    detayliMasaListesi: boolean;
    faturaYazdir: boolean;
    kapaliCekYazdir: boolean;
    misafirSorgula: boolean;
    masaTransferi: boolean;
    urunTransferi: boolean;
    iptalIkramZayi: boolean;
    gunlukKasaRaporu: boolean;
    detayliKasaRaporu: boolean;
    odemeTipiDegistirildigindeAdisyonYaz: boolean;
    personel: boolean;
    raporlar: boolean;
    xRaporu: boolean;
    ozetRapor: boolean;
    hexToDecimal: boolean;
    tarayicidanAdisyonYazdir: boolean;
    gunSonu: boolean;
    otomatikServisUcreti: number;
    otomatikServisOrani: number;
    masaGecmisiGoster: boolean;
    cariParcaliOdeme: boolean;
    otelIndiriminiKullan: boolean;
    krediKartiSecimi: boolean;
    dovizliOdeme: boolean;
    kisiNoSor: boolean;
    iptalSecimiListeden: boolean;
    siparisZorunlu: boolean;
    xRaporuDepartman: boolean;
    kasayiKapat: boolean;
    cariButton: boolean;
    ingenicoWebServis: boolean;
    masaKapat: boolean;
    bileklikleOdeme: boolean;
    musteri: boolean;
    hidCardReader: boolean;
    personeliBuluncaOtomatikKapat: boolean;
    personelButonuYukarida: boolean;
    dijitalMenu: boolean;
    adisyonYazdirilmissaMasayiKilitle: boolean;
    satirIslemleri: boolean;
}