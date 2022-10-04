import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationTransactionListComponent } from './occupation-transaction-list.component';

describe('OccupationTransactionListComponent', () => {
  let component: OccupationTransactionListComponent;
  let fixture: ComponentFixture<OccupationTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationTransactionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationTransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
