import { Component, OnInit } from '@angular/core';
import { ICustomerAccount } from '../models/customer-account.interface';
import { CustomerAccountsService } from '../services/customer-accounts-service';

@Component({
  selector: 'app-manage-customer-accounts',
  templateUrl: './manage-customer-accounts.component.html',
  styleUrls: ['./manage-customer-accounts.component.scss']
})
export class ManageCustomerAccountsComponent implements OnInit {

  public customerAccounts: ICustomerAccount[];

  constructor(private customerAccountsService: CustomerAccountsService) { }

  ngOnInit() {
    this.customerAccountsService.getAll().subscribe(customerAccounts => {
      this.customerAccounts = customerAccounts;
    });
  }
}
