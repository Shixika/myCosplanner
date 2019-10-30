import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss']
})
export class EditProjectModalComponent implements OnInit {
  @Input() project: Project;
  character: string;
  series: string;
  budget: number;
  initialDate: any;
  dueDate: string;
  dueDateInput: any;
  initialDateInput: any;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  setDatetoString(date: any, input: string) {
    input === 'dueDate'
      ? this.dueDateInput = date.day + '/' + date.month + '/' + date.year
      : this.initialDateInput = date.day + '/' + date.month + '/' + date.year;
  }

  saveProject(modal: any) {
    this.project.character = this.character ? this.character : this.project.character;
    this.project.series = this.series ? this.series : this.project.series;
    this.project.budget = this.budget || this.budget === 0 ? this.budget : this.project.budget;
    this.project.initialDate = this.initialDateInput ? this.initialDateInput : this.project.initialDate;
    this.project.dueDate = this.dueDateInput ? this.dueDateInput : this.project.dueDate;

    this.projectService.updateProject(this.project)
      .subscribe(
        () => {
          modal.close('Save click');
          this.projectService.getProject(this.project.id);
        },
        err => console.log(err),
        () => console.log('update project', this.project.id)
      );
  }

  ngOnInit() {
    this.character = this.project ? this.project.character : '';
    this.series = this.project ? this.project.series : '';
    this.budget = this.project ? this.project.budget : 0;
    this.initialDate = this.project ? this.project.initialDate : '';
    // this.dueDate = this.project ? this.project.dueDate : '';
  }

}
