export interface IMeterReading {
    id?: number;
    accountId: number;
    meterReadDateTime: Date;
    meterReadValue: number;
}
