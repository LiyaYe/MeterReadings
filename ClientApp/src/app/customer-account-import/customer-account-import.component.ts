import { Component, OnInit } from '@angular/core';
import { CustomerAccountsService } from '../services/customer-accounts-service';
import { CustomerAccountHeper } from '../services/customer-account-helper';
import { ICustomerAccount } from '../models/customer-account.interface';

@Component({
  selector: 'app-customer-account-import',
  templateUrl: './customer-account-import.component.html',
  styleUrls: ['./customer-account-import.component.css']
})
export class CustomerAccountImportComponent implements OnInit {

  private customerAccountsFile: File;

  constructor(private customerAccountsService: CustomerAccountsService,
    private customerAccountHelper: CustomerAccountHeper) { }

  ngOnInit() {
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
