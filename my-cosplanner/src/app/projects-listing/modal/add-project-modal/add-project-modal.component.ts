import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Project } from '../../../service/project/project';
import { ProjectService } from '../../../service/project/project.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {
  @Input() projects: Project[];
  project: Project;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  addProject(modal) {
    this.projectService.addProject(this.project)
      .subscribe(
        result => {
          this.projects.push(result);
          modal.close('Ok click');
        },
        err => console.log(err),
        () => console.log('add new project')
      );
  }

  ngOnInit() {
    if (this.projects) {
      this.project = {
        id: this.projects.length + 1,
        character: 'test',
        percentDone: 0,
        series: 'testtest',
        picture: '',
        purchases: {
          purchasesName: [],
          purchasesPrice: [],
          purchasesStatus: []
        },
        todos: {
          todosName: [],
          todosPercent: [],
          todosTime: []
        }
      };
    }
  }

}
