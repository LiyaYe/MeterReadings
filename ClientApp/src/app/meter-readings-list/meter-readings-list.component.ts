import { Component, OnInit, Input } from '@angular/core';
import { IMeterReading } from '../models/meter-reading.interface';

@Component({
  selector: 'app-meter-readings-list',
  templateUrl: './meter-readings-list.component.html',
  styleUrls: ['./meter-readings-list.component.scss']
})
export class MeterReadingsListComponent implements OnInit {

  @Input() meterReadings: IMeterReading[];

  public columnNames: string[] = ['accountId', 'meterReadDateTime', 'meterReadValue'];

  constructor() { }

  ngOnInit() {
  }
}
