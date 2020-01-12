import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountImportComponent } from './customer-account-import.component';

describe('CustomerAccountImportComponent', () => {
  let component: CustomerAccountImportComponent;
  let fixture: ComponentFixture<CustomerAccountImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
