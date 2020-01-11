import { IMeterReading } from "../models/meter-reading.interface";

export class MeterReadingsHelper {

  constructor() { }

  public validate(meterReading: IMeterReading): string[] {
    const errors: string[] = [];

    if (!meterReading.accountId) {
      errors.push('Account Id not provided');
    }

    if (!meterReading.meterReadDateTime) {
      errors.push('Meter read dateTime not provided');
    }

    if (!meterReading.meterReadValue) {
      errors.push('Meter read value is not valid');
    }

    return errors;
  }

  public getFormattedMeterReadValue(meterReadValue: string): number {
    const trimmedMeterReadValue = meterReadValue ? meterReadValue.replace(/[\n\r]+/g, '') : meterReadValue;

    if (!trimmedMeterReadValue
      || typeof trimmedMeterReadValue !== 'string'
      || Number.isNaN(Number(trimmedMeterReadValue))
      || !this.meterReadValuePositive(trimmedMeterReadValue)
      || !this.validMeterReadValueLength(trimmedMeterReadValue)) {
        return null;
    }

    return Number(trimmedMeterReadValue);
  }

  private validMeterReadValueLength(meterReadValue: string): boolean {
    return meterReadValue.length > 0 && meterReadValue.length < 6;
  }

  private meterReadValuePositive(meterReadValue: string): boolean {
    return Number(meterReadValue) > -1;
  }
}
