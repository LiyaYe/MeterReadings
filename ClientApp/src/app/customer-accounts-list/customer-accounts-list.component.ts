import { Component, OnInit, Input } from '@angular/core';
import { ICustomerAccount } from '../models/customer-account.interface';

@Component({
  selector: 'app-customer-accounts-list',
  templateUrl: './customer-accounts-list.component.html',
  styleUrls: ['./customer-accounts-list.component.css']
})
export class CustomerAccountsListComponent implements OnInit {

  @Input() customerAccounts: ICustomerAccount[];

  constructor() { }

  ngOnInit() {
  }

}
