import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterReadingsListComponent } from './meter-readings-list.component';

describe('MeterReadingsListComponent', () => {
  let component: MeterReadingsListComponent;
  let fixture: ComponentFixture<MeterReadingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterReadingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterReadingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
