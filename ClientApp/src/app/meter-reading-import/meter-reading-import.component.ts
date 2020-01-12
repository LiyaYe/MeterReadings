import { Component, OnInit } from '@angular/core';
import { IMeterReading } from '../models/meter-reading.interface';
import * as moment from 'moment';
import { MeterReadingsService } from '../services/meter-readings-service';
import { MeterReadingsHelper } from '../services/meter-readings-helper';

@Component({
  selector: 'app-meter-reading-import',
  templateUrl: './meter-reading-import.component.html',
  styleUrls: ['./meter-reading-import.component.css']
})
export class MeterReadingImportComponent implements OnInit {

  private meterReadingsFile: File;

  constructor(private meterReadingsService: MeterReadingsService,
    private meterReadingsHelper: MeterReadingsHelper) { }

  ngOnInit() {
  }

  public setMeterReadingsFile(files: FileList): void {
    this.meterReadingsFile = files.item(0);
  }

  public importCsv() {
    const reader = new FileReader();

    reader.onload = () => {
      const meterReadingsText = reader.result.toString();
      const jsonResult = this.csvToJSON(meterReadingsText);
      this.meterReadingsService.import(jsonResult).subscribe(result => {
        console.log(result);
      });
    };

    reader.readAsText(this.meterReadingsFile);
  }

  private csvToJSON(meterReadingsFile: string): string {
    const lines = meterReadingsFile.split('\n');
    const result: IMeterReading[] = [];
    let errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');

      const meterReading: IMeterReading = {
        accountId: Number(currentLine[0]),
        meterReadDateTime: moment(currentLine[1], 'DD/MM/YYYY HH:mm').toDate(),
        meterReadValue: this.meterReadingsHelper.getFormattedMeterReadValue(currentLine[2]),
      };

      const validationErrors = this.meterReadingsHelper.validate(meterReading);

      if (validationErrors.length === 0) {
        result.push(meterReading);
      } else {
        errors = errors.concat(validationErrors);
      }
    }

    return JSON.stringify(result);
  }

}
