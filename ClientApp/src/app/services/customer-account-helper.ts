import { ICustomerAccount } from '../models/customer-account.interface';

export class CustomerAccountHeper {
  constructor() {}

  public validate(customerAccount: ICustomerAccount): string[] {
    const errors: string[] = [];

    if (!customerAccount.accountId) {
      errors.push('Account Id not provided');
    }

    if (!customerAccount.firstName) {
      errors.push('First Name not provided');
    }

    if (!customerAccount.lastName) {
      errors.push('Last Name not provided');
    }

    return errors;
  }
}
