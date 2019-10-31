import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectTodoModalComponent } from './edit-project-todo-modal.component';

describe('EditProjectTodoModalComponent', () => {
  let component: EditProjectTodoModalComponent;
  let fixture: ComponentFixture<EditProjectTodoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectTodoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
