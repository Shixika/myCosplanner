import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectTodoModalComponent } from './add-project-todo-modal.component';

describe('AddProjectTodoModalComponent', () => {
  let component: AddProjectTodoModalComponent;
  let fixture: ComponentFixture<AddProjectTodoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectTodoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
