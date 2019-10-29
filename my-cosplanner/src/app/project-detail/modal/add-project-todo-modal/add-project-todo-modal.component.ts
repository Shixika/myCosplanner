import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-add-project-todo-modal',
  templateUrl: './add-project-todo-modal.component.html',
  styleUrls: ['./add-project-todo-modal.component.scss']
})
export class AddProjectTodoModalComponent implements OnInit {
  @Input() project: Project;
  name: string;
  hour: number;
  minute: any;
  estimate: string;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  addTodoProject(modal: any) {
    this.project.todos.todosName.push(this.name);
    this.project.todos.todosTime.push('');
    this.project.todos.todosPercent.push(0);

    if (this.hour > 0 || this.minute > 0) {
      this.minute = this.minute < 10 ? 0 + '' + this.minute : this.minute;
      this.estimate = this.hour + 'h' + this.minute;
      this.project.todos.todosEstimate.push(this.estimate);
    } else {
      this.project.todos.todosEstimate.push('');
    }

    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Save click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  ngOnInit() {
  }

}
