import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountsListComponent } from './customer-accounts-list.component';

describe('CustomerAccountsListComponent', () => {
  let component: CustomerAccountsListComponent;
  let fixture: ComponentFixture<CustomerAccountsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
