import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencePictureModalComponent } from './reference-picture-modal.component';

describe('ReferencePictureModalComponent', () => {
  let component: ReferencePictureModalComponent;
  let fixture: ComponentFixture<ReferencePictureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencePictureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
