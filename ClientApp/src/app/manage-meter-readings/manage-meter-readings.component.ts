import { Component, OnInit } from '@angular/core';
import { MeterReadingsService } from '../services/meter-readings-service';
import { IMeterReading } from '../models/meter-reading.interface';

@Component({
  selector: 'app-manage-meter-readings',
  templateUrl: './manage-meter-readings.component.html',
  styleUrls: ['./manage-meter-readings.component.scss']
})
export class ManageMeterReadingsComponent implements OnInit {

  public meterReadings: IMeterReading[];

  constructor(private meterReadingsService: MeterReadingsService) { }

  ngOnInit() {
    this.meterReadingsService.getAll().subscribe(meterReadings => {
      this.meterReadings = meterReadings;
    });
  }
}
