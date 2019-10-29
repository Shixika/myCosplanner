import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPurchaseModalComponent } from './add-project-purchase-modal.component';

describe('AddProjectPurchaseModalComponent', () => {
  let component: AddProjectPurchaseModalComponent;
  let fixture: ComponentFixture<AddProjectPurchaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectPurchaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectPurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
