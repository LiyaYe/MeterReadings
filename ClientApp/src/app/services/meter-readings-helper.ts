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

  public getFormattedMeterReadValue(meterReadValue: string): string {
    const trimmedMeterReadValue = meterReadValue ? meterReadValue.replace(/[\n\r]+/g, '') : meterReadValue;

    if (!trimmedMeterReadValue
      || !this.meterReadValueIsNumber(trimmedMeterReadValue)
      || !this.meterReadValuePositive(trimmedMeterReadValue)
      || !this.validMeterReadValueLength(trimmedMeterReadValue)) {
        return null;
    }

    return trimmedMeterReadValue.padStart(5, '0');
  }

  private validMeterReadValueLength(meterReadValue: string): boolean {
    return meterReadValue.length > 0 && meterReadValue.length < 6;
  }

  private meterReadValuePositive(meterReadValue: string): boolean {
    return Number(meterReadValue) > -1;
  }

  private meterReadValueIsNumber(meterReadValue: string): boolean {
    const regexp = new RegExp('^[0-9]+$');

    return regexp.test(meterReadValue);
  }
}
