import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-edit-project-todo-modal',
  templateUrl: './edit-project-todo-modal.component.html',
  styleUrls: ['./edit-project-todo-modal.component.scss']
})
export class EditProjectTodoModalComponent implements OnInit {
  @Input() projectTodo: { name: string, percent: number, time: string, estimate: string };
  @Input() project: Project;
  name: string;
  estimateHour: number;
  estimateMinute: any;
  estimate: string;
  timeHour: number;
  timeMinute: any;
  time: string;
  percents: number[] = [];
  selectedPercent: number;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  updateTodoProject(modal: any) {
    this.projectTodo.name = this.name ? this.name : this.projectTodo.name;
    this.projectTodo.percent = this.selectedPercent;

    // Times
    this.estimateHour = this.estimateHour ? this.estimateHour : 0;
    this.estimateMinute = this.estimateMinute ? this.estimateMinute : 0;
    this.timeHour = this.timeHour ? this.timeHour : 0;
    this.timeMinute = this.timeMinute ? this.timeMinute : 0;

    if (this.estimateHour > 0 || this.estimateMinute > 0) {
      if (this.estimateMinute <= 0) {
        this.estimateMinute = '';
      } else {
        this.estimateMinute = this.estimateMinute > 0 && this.estimateMinute < 10 ? 0 + '' + this.estimateMinute : this.estimateMinute;
      }

      this.estimate = this.estimateHour + 'h' + this.estimateMinute;
    } else {
      this.estimate = '';
    }

    this.projectTodo.estimate = this.estimate;

    if (this.timeHour > 0 || this.timeMinute > 0) {
      if (this.timeMinute <= 0) {
        this.timeMinute = '';
      } else {
        this.timeMinute = this.timeMinute > 0 && this.timeMinute < 10 ? 0 + '' + this.timeMinute : this.timeMinute;
      }

      this.time = this.timeHour + 'h' + this.timeMinute;
    } else {
      this.time = '';
    }

    this.projectTodo.time = this.time;

    // Update project
    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Save click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  deleteTodoProject(modal: any) {
    const indexTodo = this.project.todos.indexOf(this.projectTodo);
    this.project.todos.splice(indexTodo, 1);

    // Update project
    this.projectService.updateProject(this.project)
      .subscribe(
        () => modal.close('Delete click'),
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  setPercents() {
    let percent = -5;

    for (let i = 0; i <= 20; i++) {
      percent += 5;
      this.percents.push(percent);
    }
  }

  ngOnInit() {
    // Set default value for inputs
    this.name = this.projectTodo.name ? this.projectTodo.name : '';
    this.selectedPercent = this.projectTodo.percent ? this.projectTodo.percent : 0;

    if (this.projectTodo.estimate) {
      const indexHour = this.projectTodo.estimate.indexOf('h');
      const hourStr = this.projectTodo.estimate.slice(0, indexHour);
      const minuteStr = this.projectTodo.estimate.slice(indexHour + 1);
      // tslint:disable-next-line: radix
      this.estimateHour = hourStr.length > 0 ? parseInt(hourStr) : 0;
      // tslint:disable-next-line: radix
      this.estimateMinute = minuteStr.length > 0 ? parseInt(minuteStr) : 0;
    }

    if (this.projectTodo.time) {
      const indexHour = this.projectTodo.time.indexOf('h');
      const hourStr = this.projectTodo.time.slice(0, indexHour);
      const minuteStr = this.projectTodo.time.slice(indexHour + 1);
      // tslint:disable-next-line: radix
      this.timeHour = hourStr.length > 0 ? parseInt(hourStr) : 0;
      // tslint:disable-next-line: radix
      this.timeMinute = minuteStr.length > 0 ? parseInt(minuteStr) : 0;
    }

    this.setPercents();
  }
}
