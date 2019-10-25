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

  saveProject(modal) {
    this.project.character = this.character;
    this.project.series = this.series;
    this.project.budget = this.budget;
    this.project.dueDate = this.dueDateInput;
    this.project.initialDate = this.initialDateInput;

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
