import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMeterReading } from '../models/meter-reading.interface';
import * as moment from 'moment';
import { MeterReadingsService } from '../services/meter-readings-service';
import { MeterReadingsHelper } from '../services/meter-readings-helper';

@Component({
  selector: 'app-meter-reading-import',
  templateUrl: './meter-reading-import.component.html',
  styleUrls: ['./meter-reading-import.component.scss']
})
export class MeterReadingImportComponent implements OnInit {

  public successImportCount: number;
  public importCount: number;
  public showSpinner: boolean;

  private meterReadingsFile: File;

  @Output() refresh = new EventEmitter ();

  constructor(private meterReadingsService: MeterReadingsService,
    private meterReadingsHelper: MeterReadingsHelper) { }

  ngOnInit() {
  }

  public setMeterReadingsFile(files: FileList): void {
    this.meterReadingsFile = files.item(0);
  }

  public importCsv() {
    this.showSpinner = true;

    const reader = new FileReader();

    reader.onload = () => {
      const meterReadingsFile = reader.result.toString();
      const jsonResult = this.csvToJSON(meterReadingsFile);

      this.importCount = meterReadingsFile.split('\n').length - 1;

      this.meterReadingsService.import(jsonResult).subscribe(result => {
        this.successImportCount = result;
        this.showSpinner = false;
        this.refresh.emit();
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
