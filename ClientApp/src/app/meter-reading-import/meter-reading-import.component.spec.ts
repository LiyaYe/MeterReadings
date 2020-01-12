import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReadingImportComponent } from './meter-reading-import.component';

describe('MeterReadingImportComponent', () => {
  let component: MeterReadingImportComponent;
  let fixture: ComponentFixture<MeterReadingImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterReadingImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReadingImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
