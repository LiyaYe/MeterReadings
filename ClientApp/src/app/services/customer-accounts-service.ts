import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject } from '@angular/core';
import { ICustomerAccount } from '../models/customer-account.interface';
import { Observable } from 'rxjs';

export class CustomerAccountsService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = `${baseUrl}CustomerAccounts`;
  }

  public getAll(): Observable<ICustomerAccount[]> {
    return this.http.get<ICustomerAccount[]>(`${this.baseUrl}/GetAll`);
  }

  public search(firstName?: string, lastName?: string): Observable<ICustomerAccount[]> {
    return this.http.get<ICustomerAccount[]>(`${this.baseUrl}/Details?firstName${firstName}&lastName=${lastName}`);
  }

  public import(json: string): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/Import`, json, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  public get(accountId: number): Observable<ICustomerAccount[]> {
    return this.http.get<ICustomerAccount[]>(`${this.baseUrl}/Details?accountId${accountId}`);
  }

  public create(customerAccount: ICustomerAccount): Observable<ICustomerAccount[]> {
    return this.http.post<ICustomerAccount[]>(`${this.baseUrl}/Create`, customerAccount);
  }

  public edit(customerAccount: ICustomerAccount): Observable<ICustomerAccount[]> {
    return this.http.post<ICustomerAccount[]>(`${this.baseUrl}/Edit`, customerAccount);
  }

  public delete(accountId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Delete?accountId${accountId}`);
  }
}
