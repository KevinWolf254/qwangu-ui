import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAdvanceListComponent } from './rent-advance-list.component';

describe('RentAdvanceListComponent', () => {
  let component: RentAdvanceListComponent;
  let fixture: ComponentFixture<RentAdvanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentAdvanceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAdvanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
