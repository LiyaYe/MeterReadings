import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMeterReadingsComponent } from './manage-meter-readings.component';

describe('ManageMeterReadingsComponent', () => {
  let component: ManageMeterReadingsComponent;
  let fixture: ComponentFixture<ManageMeterReadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMeterReadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMeterReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
