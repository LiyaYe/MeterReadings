import { Component, OnInit } from '@angular/core';
import { ICustomerAccount } from '../models/customer-account.interface';
import { CustomerAccountsService } from '../services/customer-accounts-service';
import { CustomerAccountHeper } from '../services/customer-account-helper';

@Component({
  selector: 'app-manage-customer-accounts',
  templateUrl: './manage-customer-accounts.component.html',
  styleUrls: ['./manage-customer-accounts.component.css']
})
export class ManageCustomerAccountsComponent implements OnInit {

  public customerAccounts: ICustomerAccount[];
  private customerAccountsFile: File;

  constructor(private customerAccountsService: CustomerAccountsService,
    private customerAccountHelper: CustomerAccountHeper) { }

  ngOnInit() {
    this.customerAccountsService.getAll().subscribe(customerAccounts => {
      this.customerAccounts = customerAccounts;
    });
  }

  public setCustomerAccountsFile(files: FileList): void {
    this.customerAccountsFile = files.item(0);
  }

  public importCsv() {
    const reader = new FileReader();

    reader.onload = () => {
      const customerAccountsText = reader.result.toString();
      const jsonResult = this.csvToJSON(customerAccountsText);
      this.customerAccountsService.import(jsonResult).subscribe(result => {
        console.log(result);
      });
    };

    reader.readAsText(this.customerAccountsFile);
  }

  private csvToJSON(customerAccountsFile: string): string {
    const lines = customerAccountsFile.split('\n');
    const result: ICustomerAccount[] = [];
    let errors: string[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');

      const customerAccount = {
        accountId: Number(currentLine[0]),
        firstName: currentLine[1],
        lastName: currentLine[2],
      };

      errors = errors.concat(this.customerAccountHelper.validate(customerAccount));

      if (errors.length === 0) {
        result.push(customerAccount);
      }
    }

    return JSON.stringify(result);
  }
}
