import { Component, OnInit, Input } from '@angular/core';
import { ICustomerAccount } from '../models/customer-account.interface';

@Component({
  selector: 'app-customer-accounts-list',
  templateUrl: './customer-accounts-list.component.html',
  styleUrls: ['./customer-accounts-list.component.scss']
})
export class CustomerAccountsListComponent implements OnInit {

  @Input() customerAccounts: ICustomerAccount[];

  public columnNames: string[] = ['accountId', 'firstName', 'lastName'];

  constructor() { }

  ngOnInit() {
  }
}
