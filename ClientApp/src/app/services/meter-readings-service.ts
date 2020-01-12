import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IMeterReading } from '../models/meter-reading.interface';

export class MeterReadingsService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}MeterReadings`;
  }

  public getAll(): Observable<IMeterReading[]> {
    return this.http.get<IMeterReading[]>(`${this.baseUrl}/GetAll`);
  }

  public search(accountId?: number, from?: Date, to?: Date): Observable<IMeterReading[]> {
    return this.http.get<IMeterReading[]>(`${this.baseUrl}/Search?AccountId${accountId}&From?${from}&To${to}`);
  }

  public import(meterReadings: string): Observable<number> {
    return this.http.post <number>(`${this.baseUrl}/Import`, meterReadings, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  public create(meterReading: IMeterReading): Observable<IMeterReading[]> {
    return this.http.post<IMeterReading[]>(`${this.baseUrl}/Create`, meterReading);
  }
}
