import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPurchaseModalComponent } from './edit-project-purchase-modal.component';

describe('EditProjectPurchaseModalComponent', () => {
  let component: EditProjectPurchaseModalComponent;
  let fixture: ComponentFixture<EditProjectPurchaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectPurchaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectPurchaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
